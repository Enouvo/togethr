import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"

pub fun main(projectId: UInt32): {Address: UInt64}? {
    return TogethrProjects.getProject(projectId: projectId)
}