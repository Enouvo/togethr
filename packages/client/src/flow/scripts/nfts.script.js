export const GET_NFTS = `
  import NonFungibleToken from 0xNonFungibleToken
  import TogethrNFT from 0xTogethrNFT
  import TogethrMarket from 0xTogethrMarket

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
`;

export const GET_NFTS_FOR_SALE = `
  import NonFungibleToken from 0xNonFungibleToken
  import TogethrNFT from 0xTogethrNFT
  import TogethrMarket from 0xTogethrMarket

  pub fun main(): {UInt64: String} {
    let nfts = TogethrMarket.getProjects()
    let nftIdAndIpfsHashMap: {UInt64: String} = {}

    for key in nfts.keys {
      let address = nfts[key]!
      let collection = getAccount(address)
            .getCapability(TogethrNFT.CollectionPublicPath)
            .borrow<&TogethrNFT.Collection{TogethrNFT.CollectionPublic}>()
            ?? panic("Could not borrow capability from public collection")
      let ipfsHash = collection.borrowEntireNFT(id: key)!.ipfsHash
      nftIdAndIpfsHashMap[key] = ipfsHash
    }

    return nftIdAndIpfsHashMap
  }
`;
