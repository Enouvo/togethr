
import TogethrNFT from "../../../contracts/Project/TogethrNFT.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"

import FlowToken from Flow.FlowToken

transaction(projectId: UInt32, ipfsHash: String): UInt64 {

  let address: Address
     
  prepare(signer: AuthAccount) {
    if signer.borrow<&TogethrNFT.Collection>(from: TogethrNFT.CollectionStoragePath) == nil {
      let collection <- TogethrNFT.createEmptyCollection()
      signer.save(<-collection, to: TogethrNFT.CollectionStoragePath)
      signer.link<&TogethrNFT.Collection{TogethrNFT.CollectionPublic}>(TogethrNFT.CollectionPublicPath, target: TogethrNFT.CollectionStoragePath)
    }
    self.address = signer.address
  }

  execute { 
    return TogethrNFT.mintNFT(recipient: self.address, projectId: projectId, ipfsHash: ipfsHash)
  }

}
