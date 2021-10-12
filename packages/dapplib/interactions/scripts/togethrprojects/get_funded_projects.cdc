import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"

pub fun main(address: Address): {UInt32: UFix64} {
  let fundedProjectsRef = getAccount(address).getCapability(TogethrProjects.FundedProjectsPublicPath)
                              .borrow<&TogethrProjects.FundedProjects{TogethrProjects.IFundedProjects}>()
                              ?? panic("Could not borrow TogethrProjects")

  return fundedProjectsRef.getFundedProjects()
}
