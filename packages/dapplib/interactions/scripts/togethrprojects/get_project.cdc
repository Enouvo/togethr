import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrProject from "../../../contracts/Project/TogethrProject.cdc"

pub fun main(projectId: UInt32): Address? {
    return TogethrProject.getProjectCreatorAddress(projectId: projectId)
}