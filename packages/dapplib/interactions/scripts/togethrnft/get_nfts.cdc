
import NonFungibleToken from "../../../contracts/Flow/NonFungibleToken.cdc"
import TogethrNFT from "../../../contracts/Project/TogethrNFT.cdc"

pub fun main(address: Address): {UInt64: String} {
  let nftIdAndIpfsHashMap: {UInt64: String} = {}

  let collection = getAccount(address)  
          .getCapability(TogethrNFT.CollectionPublicPath)
          .borrow<&TogethrNFT.Collection{TogethrNFT.CollectionPublic}>()

  if(collection == nil) {
    return {}
  }       

  for nftId in collection!.getIDs() {
    let ipfsHash = collection!.borrowEntireNFT(id: nftId)!.ipfsHash
    nftIdAndIpfsHashMap[nftId] = ipfsHash
  }

  return nftIdAndIpfsHashMap
}