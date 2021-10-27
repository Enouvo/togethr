import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrCreator from "../../../contracts/Project/TogethrCreator.cdc"

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