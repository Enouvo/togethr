import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import FlowToken from Flow.FlowToken

transaction(creator: Address, name: String) {
    
  prepare(signer: AuthAccount) {
    TogethrProjects.addProject(creator: creator, name: name)
  }

  execute { 
  }

}
