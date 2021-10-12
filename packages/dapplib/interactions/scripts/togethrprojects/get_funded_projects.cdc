import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrProjects from "../../../contracts/Project/TogethrProjects.cdc"

pub fun main(address: Address): {UInt32: UInt64} {
  let fundedProjectsRef = getAccount(address).getCapability(TogethrProjects.FundedProjectsPublicPath)
                              .borrow<&{TogethrProjects.IFundedProjects}>()
                              ?? panic("Could not borrow TogethrProjects")

  return fundedProjectsRef.getFundedProjects()
}