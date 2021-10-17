import TogethrProject from "../../../contracts/Project/TogethrProject.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import FlowToken from Flow.FlowToken

transaction(name: String) {

  let collection: &TogethrProject.Collection
    
  prepare(signer: AuthAccount) {
    // if the account doesn't already have a collection
    if signer.borrow<&TogethrProject.Collection>(from: TogethrProject.CollectionStoragePath) == nil {

        // create a new empty collection
        let collection <- TogethrProject.createEmptyCollection(address: signer.address)
        
        // save it to the account
        signer.save(<-collection, to: TogethrProject.CollectionStoragePath)

        // create a public capability for the collection
        signer.link<&TogethrProject.Collection{TogethrProject.ICollectionPublic}>(TogethrProject.CollectionPublicPath, target: TogethrProject.CollectionStoragePath)
    }

    self.collection = signer.borrow<&TogethrProject.Collection>(from: TogethrProject.CollectionStoragePath)!
  }

  execute { 
    self.collection.addProject(name: name)
  }

}
