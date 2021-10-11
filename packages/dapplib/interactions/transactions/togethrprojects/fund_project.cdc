import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"

transaction(projectId: UInt32, funder: Address, amount: UInt64) {
    
  prepare(signer: AuthAccount) {
    TogethrProjects.fundProject(projectId: projectId, funder: funder, amount: amount)
  }

  execute { 
  }

}
