export const GET_PROJECTS = `
  import NonFungibleToken from 0xNonFungibleToken
  import TogethrCreator from 0xTogethr

  pub fun main(): [TogethrCreator.ProjectData] {
    let projects = TogethrCreator.getProjects()
    let projectMetaData: [TogethrCreator.ProjectData] = []
    for key in projects.keys {
      let address = projects[key]!
      let collection = getAccount(address).getCapability<&TogethrCreator.Collection{TogethrCreator.PublicCollection}>(TogethrCreator.CollectionPublicPath)
                              .borrow()
                              ?? panic("Could not borrow capability from public collection")

      log(collection.getProjectMetadata(projectId: key)) 
      projectMetaData.append(collection.getProjectMetadata(projectId: key))                           
    }

    return projectMetaData
  }
`;
