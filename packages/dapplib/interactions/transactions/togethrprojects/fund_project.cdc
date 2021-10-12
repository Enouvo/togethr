import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"

transaction(projectId: UInt32, funder: Address, amount: UInt64) {
    
  prepare(signer: AuthAccount) {
    if signer.borrow<&TogethrProjects.FundedProjects>(from: TogethrProjects.FundedProjectsStoragePath) == nil {
        let fundedProjects <- TogethrProjects.createEmptyFundedProjects()
        signer.save(<-fundedProjects, to: TogethrProjects.FundedProjectsStoragePath)
        signer.link<&TogethrProjects.FundedProjects{TogethrProjects.IFundedProjects}>(TogethrProjects.FundedProjectsPublicPath, target: TogethrProjects.FundedProjectsStoragePath)
    }

    let fundedProjects = signer.borrow<&TogethrProjects.FundedProjects>(from: TogethrProjects.FundedProjectsStoragePath)!
    TogethrProjects.fundProject(projectId: projectId, funder: funder, amount: amount, fundedProjects: fundedProjects)
  }

  execute { 
  }

}
