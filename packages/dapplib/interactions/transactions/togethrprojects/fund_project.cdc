import TogethrProject from "../../../contracts/Project/TogethrProject.cdc"
import TogethrFunder from "../../../contracts/Project/TogethrFunder.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import FlowToken from Flow.FlowToken

transaction(projectId: UInt32, funder: Address, amount: UFix64) {

  let collection: &TogethrProject.Collection{TogethrProject.ICollectionPublic}
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

    let creator = TogethrProject.getProjectCreatorAddress(projectId: projectId) ?? panic("Could not borrow FUSD vault")

    log(creator)
    self.collection = getAccount(creator).getCapability<&TogethrProject.Collection{TogethrProject.ICollectionPublic}>(TogethrProject.CollectionPublicPath)
                            .borrow()
                            ?? panic("Could not borrow capability from public collection")

        
  }

  execute { 
    self.collection.fundProject(projectId: projectId, funder: funder, amount: amount, fundedProjects: self.fundedProjects, paymentVault: <-self.sentVault)
  }

}

