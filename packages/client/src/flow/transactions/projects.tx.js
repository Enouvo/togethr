export const CREATE_PROJECT = `
  import FungibleToken from 0xFungibleToken
  import TogethrCreator from 0xTogethrCreator
  import FlowToken from 0xFlowToken

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
`;

export const FUND_PROJECT = `
  import TogethrFunder from 0xTogethrFunder
  import FungibleToken from 0xFungibleToken
  import TogethrCreator from 0xTogethrCreator
  import FlowToken from 0xFlowToken

  transaction(projectId: UInt32, funder: Address, tokenCount: UInt32) {

    let collection: &TogethrCreator.Collection{TogethrCreator.PublicCollection}
    let sentVault: @FungibleToken.Vault
      
    prepare(signer: AuthAccount) {
      if signer.borrow<&TogethrFunder.Collection>(from: TogethrFunder.CollectionStoragePath) == nil {
          let fundedProjects <- TogethrFunder.createEmptyFundedProjects()
          signer.save(<-fundedProjects, to: TogethrFunder.CollectionStoragePath)
          signer.link<&TogethrFunder.Collection{TogethrFunder.PublicCollection}>(TogethrFunder.CollectionPublicPath, target: TogethrFunder.CollectionStoragePath)
      }

      let projectMetadata = TogethrCreator.getProjectMetadata(projectId: projectId);
      let amount = projectMetadata.tokenPrice * UFix64(tokenCount)
      let vaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) ?? panic("Could not borrow FUSD vault")
      self.sentVault <- vaultRef.withdraw(amount: amount)

      let creator = TogethrCreator.getProjectCreatorAddress(projectId: projectId) ?? panic("Could not borrow FUSD vault")
      self.collection = getAccount(creator).getCapability<&TogethrCreator.Collection{TogethrCreator.PublicCollection}>(TogethrCreator.CollectionPublicPath)
                              .borrow()
                              ?? panic("Could not borrow capability from public collection")
    }

    execute { 
      self.collection.fundProject(funder: funder, projectId: projectId,  tokenCount: tokenCount, paymentVault: <-self.sentVault)
    }

  }


`;

export const MINT_PROJECT = `
import TogethrNFT from 0xTogethrNFT
import NonFungibleToken from 0xNonFungibleToken
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import TogethrMarket from 0xTogethrMarket

transaction(projectId: UInt32, ipfsHash: String, price: UFix64) {

  let address: Address
  let saleCollection: &TogethrMarket.SaleCollection
     
  prepare(signer: AuthAccount) {
    if signer.borrow<&TogethrNFT.Collection>(from: TogethrNFT.CollectionStoragePath) == nil {
      let collection <- TogethrNFT.createEmptyCollection()
      signer.save(<-collection, to: TogethrNFT.CollectionStoragePath)
      signer.link<&TogethrNFT.Collection{TogethrNFT.CollectionPublic}>(TogethrNFT.CollectionPublicPath, target: TogethrNFT.CollectionStoragePath)
    }

    self.address = signer.address

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
    let nftId = TogethrNFT.mintNFT(recipient: self.address, projectId: projectId, ipfsHash: ipfsHash)
    self.saleCollection.listForSale(itemID: nftId, price: price)
  }

}

`;
