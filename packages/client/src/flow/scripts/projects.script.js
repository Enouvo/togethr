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
  pub fun main(projectId: UInt32): TogethrCreator.ProjectData {
    return TogethrCreator.getProjectMetadata(projectId: projectId)
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

export const GET_PROJECTS_BY_ADDRESS = `
  import NonFungibleToken from 0xNonFungibleToken
  import TogethrCreator from 0xTogethrCreator
  pub fun main(address: Address): {UInt32: TogethrCreator.ProjectData} {
    let collectionRef = getAccount(address).getCapability(TogethrCreator.CollectionPublicPath)
                                .borrow<&TogethrCreator.Collection{TogethrCreator.PublicCollection}>()                              
    if(collectionRef != nil) {
      return collectionRef!.getProjects()
    }
    return {}
  }
`;

export const GET_LISTINGS = `
  import NonFungibleToken from 0xNonFungibleToken
  import TogethrMarket from 0xTogethrMarket

  pub fun main(): {UInt64: UFix64} {
    let nfts = TogethrMarket.getProjects()
    let nftIdAndPriceMap: {UInt64: UFix64} = {}

    for nftId in nfts.keys {
      let ownerAddress = nfts[nftId]!
      let collection = getAccount(ownerAddress).getCapability<&TogethrMarket.SaleCollection{TogethrMarket.SalePublic}>(TogethrMarket.PublicPath)
                              .borrow() ?? panic("Could not borrow capability from public collection")
      let price = collection.idPrice(itemID: nftId) 
      nftIdAndPriceMap[nftId] = price
    }

    return nftIdAndPriceMap
  }
`;
