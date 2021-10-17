import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrFunder from "../../../contracts/Project/TogethrFunder.cdc"

pub fun main(): [UInt32] {
    return TogethrFunder.getProjects()
}