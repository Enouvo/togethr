import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import TogethrMarket from "../../../contracts/Project/TogethrMarket.cdc"
import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrNFT from "../../../contracts/Project/TogethrNFT.cdc"
import FlowToken from Flow.FlowToken

transaction(nftId: UInt64) {

  let saleCollection: &TogethrMarket.SaleCollection

 prepare(signer: AuthAccount) {
    if signer.borrow<&TogethrMarket.SaleCollection>(from: TogethrMarket.StoragePath) == nil {

      let vault = signer.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
      assert(vault.borrow() != nil, message: "Missing or mis-typed Kibble Vault")
     
      signer.link<&TogethrNFT.Collection>(/private/privateTogethrNFTCollection, target: TogethrNFT.CollectionStoragePath)
      let ownerCollection = signer.getCapability<&TogethrNFT.Collection>(/private/privateTogethrNFTCollection)
      assert(ownerCollection.borrow() != nil, message: "Missing or mis-typed Kitty Items Collection")
   
      let saleCollection <- TogethrMarket.createSaleCollection(address: signer.address, ownerVault: vault, ownerCollection: ownerCollection)
      signer.save(<-saleCollection, to: TogethrMarket.StoragePath)
      signer.link<&TogethrMarket.SaleCollection{TogethrMarket.SalePublic}>(TogethrMarket.PublicPath, target: TogethrMarket.StoragePath)
    
      log("Gave account a sale collection")
    }

    self.saleCollection = signer.borrow<&TogethrMarket.SaleCollection>(from: TogethrMarket.StoragePath) 
          ?? panic("Could not borrow the SaleCollection")
  }

  execute {
      // Update to pass price and pass NFT ID not project ID
      self.saleCollection.listForSale(itemID: nftId, price: UFix64(100))

      log("Listed Kitty Items for sale")
  }
}

