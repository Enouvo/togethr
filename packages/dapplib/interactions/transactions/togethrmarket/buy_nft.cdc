import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import TogethrMarket from "../../../contracts/Project/TogethrMarket.cdc"
import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrNFT from "../../../contracts/Project/TogethrNFT.cdc"
import FlowToken from Flow.FlowToken

transaction(itemID: UInt64, seller: Address) {

    let saleCollection: &TogethrMarket.SaleCollection{TogethrMarket.SalePublic}

    let vault: &FlowToken.Vault

    let nftCollection: &TogethrNFT.Collection{TogethrNFT.CollectionPublic}
    
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

      self.saleCollection = getAccount(seller).getCapability(TogethrMarket.PublicPath)
          .borrow<&TogethrMarket.SaleCollection{TogethrMarket.SalePublic}>()
          ?? panic("Could not borrow the SaleCollection")

      self.vault =  signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
          ?? panic("Could not borrow reference to the owner's Vault!")

      self.nftCollection = signer.getCapability(TogethrNFT.CollectionPublicPath)
          .borrow<&TogethrNFT.Collection{TogethrNFT.CollectionPublic}>()
          ?? panic("Could not borrow from the signer's Kitty Items Collection")

    }

    execute {
        let price = self.saleCollection.idPrice(itemID: itemID) ?? panic("A Kitty Item with this itemID is not up for sale")
        let vault <- self.vault.withdraw(amount: price)

        self.saleCollection.purchase(itemID: itemID, recipient: self.nftCollection, buyTokens: <-vault)
    }
}