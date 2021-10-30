import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrNFT from "../../../contracts/Project/TogethrNFT.cdc"
import TogethrMarket from "../../../contracts/Project/TogethrMarket.cdc"

pub fun main(): {UInt64: String} {
  let projects = TogethrMarket.getProjects()
  let projectMap: {UInt64: String} = {}

  for key in projects.keys {
    let address = projects[key]!
    let collection = getAccount(address)
          .getCapability(TogethrNFT.CollectionPublicPath)
          .borrow<&TogethrNFT.Collection{TogethrNFT.CollectionPublic}>()
          ?? panic("Could not borrow public NFT collection")
    let ipfsHash = collection.borrowEntireNFT(id: key)!.ipfsHash
    projectMap[key] = ipfsHash
  }

  return projectMap
}