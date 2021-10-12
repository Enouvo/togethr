import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import FlowToken from Flow.FlowToken

transaction(projectId: UInt32, funder: Address, amount: UFix64) {

  let fundedProjects: &TogethrProjects.FundedProjects
  let sentVault: @FungibleToken.Vault
    
  prepare(signer: AuthAccount) {
    if signer.borrow<&TogethrProjects.FundedProjects>(from: TogethrProjects.FundedProjectsStoragePath) == nil {
        let fundedProjects <- TogethrProjects.createEmptyFundedProjects()
        signer.save(<-fundedProjects, to: TogethrProjects.FundedProjectsStoragePath)
        signer.link<&TogethrProjects.FundedProjects{TogethrProjects.IFundedProjects}>(TogethrProjects.FundedProjectsPublicPath, target: TogethrProjects.FundedProjectsStoragePath)
    }

    self.fundedProjects = signer.borrow<&TogethrProjects.FundedProjects>(from: TogethrProjects.FundedProjectsStoragePath)!
    
    let vaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault) ?? panic("Could not borrow FUSD vault")
    self.sentVault <- vaultRef.withdraw(amount: amount)
  }

  execute { 
    TogethrProjects.fundProject(projectId: projectId, 
    funder: funder, amount: amount, fundedProjects: self.fundedProjects, paymentVault: <-self.sentVault)
  }

}
