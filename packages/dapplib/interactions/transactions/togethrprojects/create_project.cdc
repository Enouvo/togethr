import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"
import FungibleToken from "../../../contracts/Flow/FungibleToken.cdc"

transaction(creator: Address, name: String) {
    
    prepare(signer: AuthAccount) {
    }

    execute {
      TogethrProjects.addProject(creator: creator, name: name)
    }

}
