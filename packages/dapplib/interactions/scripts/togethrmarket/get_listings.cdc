import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrMarket from "../../../contracts/Project/TogethrMarket.cdc"

pub fun main(): {UInt64: UFix64} {
  let nfts = TogethrMarket.getProjects()
  let nftIdAndPriceMap: {UInt64: UFix64} = {}

  for nftId in nfts.keys {
    let ownerAddress = nfts[nftId]!
    let collection = getAccount(ownerAddress).getCapability<&TogethrMarket.SaleCollection{TogethrMarket.SalePublic}>(TogethrMarket.PublicPath)
                            .borrow() ?? panic("Could not borrow capability from public collection")
    let price = collection.idPrice(itemID: nftId) 
    nftIdAndPriceMap[nftId] = price
  }

  return nftIdAndPriceMap
}