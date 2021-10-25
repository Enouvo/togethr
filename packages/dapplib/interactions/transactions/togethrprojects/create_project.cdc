
import TogethrCreator from "../../../contracts/Project/TogethrCreator.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import FlowToken from Flow.FlowToken

transaction(name: String, ipfsHash: String, tokenPrice: UFix64, tokenCount: UInt32, profitSharePercent: UInt32) {

  let collection: &TogethrCreator.Collection
    
  prepare(signer: AuthAccount) {
    // if the account doesn't already have a collection
    if signer.borrow<&TogethrCreator.Collection>(from: TogethrCreator.CollectionStoragePath) == nil {

        // create a new empty collection
        let collection <- TogethrCreator.createEmptyCollection(address: signer.address)
        
        // save it to the account
        signer.save(<-collection, to: TogethrCreator.CollectionStoragePath)

        // create a public capability for the collection
        signer.link<&TogethrCreator.Collection{TogethrCreator.PublicCollection}>(TogethrCreator.CollectionPublicPath, target: TogethrCreator.CollectionStoragePath)
    }

    self.collection = signer.borrow<&TogethrCreator.Collection>(from: TogethrCreator.CollectionStoragePath)!
  }

  execute { 
    self.collection.addProject(name: name, ipfsHash: ipfsHash, tokenPrice: tokenPrice, tokenCount: tokenCount, profitSharePercent: profitSharePercent)
  }

}
