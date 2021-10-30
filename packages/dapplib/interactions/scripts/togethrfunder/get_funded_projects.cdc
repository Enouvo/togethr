import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrFunder from "../../../contracts/Project/TogethrFunder.cdc"

pub fun main(address: Address): {UInt32: UInt32} {
  let collection = getAccount(address).getCapability(TogethrFunder.CollectionPublicPath)
                              .borrow<&TogethrFunder.Collection{TogethrFunder.PublicCollection}>()
                              ?? panic("Could not borrow capability from public collection")

  return collection.getFundedProjects()
}
