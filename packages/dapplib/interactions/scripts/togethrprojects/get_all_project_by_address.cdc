import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrCreator from "../../../contracts/Project/TogethrCreator.cdc"

pub fun main(address: Address): {UInt32: TogethrCreator.ProjectData} {
  let collectionRef = getAccount(address).getCapability(TogethrCreator.CollectionPublicPath)
                              .borrow<&TogethrCreator.Collection{TogethrCreator.PublicCollection}>()                              
  if(collectionRef != nil) {
    return collectionRef!.getProjects()
  }
  return {}
}