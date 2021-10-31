export const LIST_NFT = `
  import FungibleToken from 0xTogethrMarket
  import TogethrMarket from 0xTogethrMarket
  import FlowToken from Flow.FlowToken
  import TogethrNFT from 0xTogethrNFT
  import NonFungibleToken from 0xNonFungibleToken
  import FlowToken from 0xFlowToken

  transaction(nftId: UInt64, price: UFix64) {

    let saleCollection: &TogethrMarket.SaleCollection

  prepare(signer: AuthAccount) {
      if signer.borrow<&TogethrMarket.SaleCollection>(from: TogethrMarket.StoragePath) == nil {

        let vault = signer.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
        assert(vault.borrow() != nil, message: "Could not borrow flow token receiver")
      
        signer.link<&TogethrNFT.Collection>(/private/privateTogethrNFTCollection, target: TogethrNFT.CollectionStoragePath)
        let ownerCollection = signer.getCapability<&TogethrNFT.Collection>(/private/privateTogethrNFTCollection)
        assert(ownerCollection.borrow() != nil, message: "Could not borrow capability from public collection")
    
        let saleCollection <- TogethrMarket.createSaleCollection(address: signer.address, ownerVault: vault, ownerCollection: ownerCollection)
        signer.save(<-saleCollection, to: TogethrMarket.StoragePath)
        signer.link<&TogethrMarket.SaleCollection{TogethrMarket.SalePublic}>(TogethrMarket.PublicPath, target: TogethrMarket.StoragePath)
      }

      self.saleCollection = signer.borrow<&TogethrMarket.SaleCollection>(from: TogethrMarket.StoragePath) 
            ?? panic("Could not borrow capability from public collection")
    }

    execute {
        self.saleCollection.listForSale(itemID: nftId, price: price)
    }
  }
`;
