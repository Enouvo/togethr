import TogethrCreator from "../../../contracts/Project/TogethrCreator.cdc"
import TogethrFunder from "../../../contracts/Project/TogethrFunder.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import FlowToken from Flow.FlowToken

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

