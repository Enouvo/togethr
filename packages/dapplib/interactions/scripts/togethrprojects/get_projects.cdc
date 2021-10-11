import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"

pub fun main(): {UInt32: TogethrProjects.Project} {
    return TogethrProjects.getProjects()
}