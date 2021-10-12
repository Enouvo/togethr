import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"
import FlowToken from Flow.FlowToken

transaction(creator: Address, name: String) {
    
  prepare(signer: AuthAccount) {

    let creatorVault = signer.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
    assert(creatorVault.borrow() != nil, message: "Missing or mis-typed Kibble Vault")

    TogethrProjects.addProject(vault: creatorVault, creator: creator, name: name)
  }

  execute { 
  }

}
