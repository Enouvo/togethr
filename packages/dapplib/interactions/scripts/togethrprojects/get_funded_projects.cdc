import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrFunder from "../../../contracts/Project/TogethrFunder.cdc"

pub fun main(address: Address): {UInt32: UFix64} {
  let fundedProjectsRef = getAccount(address).getCapability(TogethrFunder.PublicPath)
                              .borrow<&TogethrFunder.Collection{TogethrFunder.PublicCollection}>()
                              ?? panic("Could not borrow TogethrFunder")

  return fundedProjectsRef.getFundedProjects()
}
