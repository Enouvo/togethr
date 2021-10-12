import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"

pub fun main(projectId: UInt32): {Address: UFix64}? {
    return TogethrProjects.getProject(projectId: projectId)
}