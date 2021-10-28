export const CREATE_PROJECT = `
  import FungibleToken from 0xFungibleToken
  import TogethrCreator from 0xTogethr
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
  import TogethrFunder from 0xTogethr
  import FungibleToken from 0xFungibleToken
  import TogethrCreator from 0xTogethr
  import FlowToken from Flow.FlowToken

  transaction(projectId: UInt32, funder: Address, amount: UFix64) {

    let collection: &TogethrCreator.Collection{TogethrCreator.PublicCollection}
    let fundedProjects: &TogethrFunder.Collection
    let sentVault: @FungibleToken.Vault
      
    prepare(signer: AuthAccount) {
      if signer.borrow<&TogethrFunder.Collection>(from: TogethrFunder.StoragePath) == nil {
          let fundedProjects <- TogethrFunder.createEmptyFundedProjects()
          signer.save(<-fundedProjects, to: TogethrFunder.StoragePath)
          signer.link<&TogethrFunder.Collection{TogethrFunder.PublicCollection}>(TogethrFunder.PublicPath, target: TogethrFunder.StoragePath)
      }

      self.fundedProjects = signer.borrow<&TogethrFunder.Collection>(from: TogethrFunder.StoragePath)!
      
      let vaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) ?? panic("Could not borrow FUSD vault")
      self.sentVault <- vaultRef.withdraw(amount: amount)

      let creator = TogethrCreator.getProjectCreatorAddress(projectId: projectId) ?? panic("Could not borrow FUSD vault")

      log(creator)
      self.collection = getAccount(creator).getCapability<&TogethrCreator.Collection{TogethrCreator.PublicCollection}>(TogethrCreator.CollectionPublicPath)
                              .borrow()
                              ?? panic("Could not borrow capability from public collection")

          
    }

    execute { 
      self.collection.fundProject(projectId: projectId, funder: funder, amount: amount, fundedProjects: self.fundedProjects, paymentVault: <-self.sentVault)
    }

  }


`;
