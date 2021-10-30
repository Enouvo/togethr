
import TogethrNFT from "../../../contracts/Project/TogethrNFT.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"

import FlowToken from Flow.FlowToken

transaction(projectId: UInt32, ipfsHash: String) {

  let address: Address
     
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

    self.address = signer.address

  }

  execute { 
    TogethrNFT.mintNFT(recipient: self.address, projectId: projectId, ipfsHash: ipfsHash)
  }

}
