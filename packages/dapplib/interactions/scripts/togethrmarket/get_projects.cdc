import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrMarket from "../../../contracts/Project/TogethrMarket.cdc"

pub fun main(): {UInt64: Address} {
  // borrow nft and get NFT details most probably only IPFS link with JSON file?
  return TogethrMarket.getProjects()
}