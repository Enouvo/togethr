export const GET_PROJECTS = `
  import NonFungibleToken from 0xNonFungibleToken
  import TogethrCreator from 0xTogethrCreator
  pub fun main(): {UInt32: TogethrCreator.ProjectData} {
    let projects = TogethrCreator.getProjects()
    // let projectList: [TogethrCreator.ProjectData] = []
    let projectMap: {UInt32: TogethrCreator.ProjectData} = {}
    for key in projects.keys {
      let address = projects[key]!
      let collection = getAccount(address).getCapability<&TogethrCreator.Collection{TogethrCreator.PublicCollection}>(TogethrCreator.CollectionPublicPath)
                              .borrow()
                              ?? panic("Could not borrow capability from public collection")
      let projectMetaData = collection.getProjectMetadata(projectId: key)

      log(projectMetaData) 
      // projectList.append(projectMetaData)   
      projectMap[key] = collection.getProjectMetadata(projectId: key)                       
    }

    return projectMap
  }
`;

export const GET_PROJECT = `
  import NonFungibleToken from 0xNonFungibleToken
  import TogethrCreator from 0xTogethrCreator
  pub fun main(projectId: UInt32): Address? {
      return TogethrCreator.getProjectCreatorAddress(projectId: projectId)
  }
`;

export const GET_FUNDED_PROJECT = `
  import NonFungibleToken from 0xNonFungibleToken
  import TogethrCreator from 0xTogethrCreator
  pub fun main(address: Address): {UInt32: UFix64} {
    let fundedProjectsRef = getAccount(address).getCapability(TogethrFunder.PublicPath)
                                .borrow<&TogethrFunder.Collection{TogethrFunder.PublicCollection}>()
                                ?? panic("Could not borrow TogethrFunder")

    return fundedProjectsRef.getFundedProjects()
  }
`;

export const GET_REMAINNING_TOKEN_COUNT = `
  import NonFungibleToken from 0xNonFungibleToken
  import TogethrCreator from 0xTogethrCreator
  pub fun main(projectId: UInt32): UInt32 {
      return TogethrCreator.getRemainingTokenCount(projectId: projectId)
  }
`;

export const GET_FUNDERS = `
  import NonFungibleToken from 0xNonFungibleToken
  import TogethrCreator from 0xTogethrCreator
  pub fun main(projectId: UInt32): {Address: UInt32} {
      return TogethrCreator.getProjectFunders(projectId: projectId)!
  }
`;
