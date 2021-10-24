import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrCreator from "../../../contracts/Project/TogethrCreator.cdc"

pub fun main(): [UInt32] {
    return TogethrCreator.getProjects()
}