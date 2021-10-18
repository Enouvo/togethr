
import TogethrNFT from "../../../contracts/Project/TogethrNFT.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"

import FlowToken from Flow.FlowToken

transaction(projectId: UInt32) {

  let collection: &TogethrNFT.Collection
  let minter: &TogethrNFT.NFTMinter
     
  prepare(signer: AuthAccount) {
    // if the account doesn't already have a collection
    if signer.borrow<&TogethrNFT.Collection>(from: TogethrNFT.CollectionStoragePath) == nil {

        // create a new empty collection
        let collection <- TogethrNFT.createEmptyCollection()
        
        // save it to the account
        signer.save(<-collection, to: TogethrNFT.CollectionStoragePath)

        // create a public capability for the collection
        signer.link<&TogethrNFT.Collection{TogethrNFT.CollectionPublic}>(TogethrNFT.CollectionPublicPath, target: TogethrNFT.CollectionStoragePath)
    }

    self.collection = signer.borrow<&TogethrNFT.Collection>(from: TogethrNFT.CollectionStoragePath)!

    // borrow a reference to the NFTMinter resource in storage
    self.minter = signer.borrow<&TogethrNFT.NFTMinter>(from: TogethrNFT.MinterStoragePath)
                        ?? panic("Could not borrow a reference to the NFT minter")

  }

  execute { 
    // self.collection.addProject(name: name)
    self.minter.mintNFT(recipient: self.collection, typeID: UInt64(projectId))
  }

}
