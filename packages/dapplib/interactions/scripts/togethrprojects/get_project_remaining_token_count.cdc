import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrCreator from "../../../contracts/Project/TogethrCreator.cdc"

pub fun main(projectId: UInt32): UInt32 {
    return TogethrCreator.getRemainingTokenCount(projectId: projectId)
}