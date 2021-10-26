export const GET_PROJECTS = `
  import NonFungibleToken from 0x631e88ae7f1d7c20
  import TogethrCreator from 0x507f5f6b3c05028b

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
