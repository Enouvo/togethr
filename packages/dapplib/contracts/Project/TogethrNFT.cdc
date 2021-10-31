import NonFungibleToken from "../Flow/NonFungibleToken.cdc"
import TogethrCreator from "./TogethrCreator.cdc"

pub contract TogethrNFT: NonFungibleToken {

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event Minted(id: UInt64, typeID: UInt64)

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    
    pub var totalSupply: UInt64

    pub resource NFT: NonFungibleToken.INFT {
        pub let id: UInt64
        pub let projectId: UInt32
        pub let ipfsHash: String
        init(id: UInt64, projectId: UInt32, ipfsHash: String) {
            self.id = id
            self.projectId = projectId
            self.ipfsHash = ipfsHash
        }
    }

    pub resource interface CollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun getIDs(): [UInt64]
        pub fun borrowEntireNFT(id: UInt64): &NFT? {
            post {
                (result == nil) || (result?.id == id): 
                    "Failed to borrow an NFT: invalid id"
            }
        }
    }

    pub resource Collection: CollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("Failed to withdraw NFT: NFT with given id not found")
            emit Withdraw(id: token.id, from: self.owner?.address)
            return <-token
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @TogethrNFT.NFT
            let id: UInt64 = token.id
            let oldToken <- self.ownedNFTs[id] <- token
            emit Deposit(id: id, to: self.owner?.address)
            destroy oldToken
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowEntireNFT(id: UInt64): &NFT? {
            if self.ownedNFTs[id] != nil {
                let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                return ref as! &NFT
            } else {
                return nil
            }
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }

        destroy() {
            destroy self.ownedNFTs
        }

        init () {
            self.ownedNFTs <- {}
        }
    }

    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }


  pub fun mintNFT(recipient: Address, projectId: UInt32, ipfsHash: String) {
      pre {
        TogethrCreator.projects[projectId] == recipient: "Failed to mint NFT: invalid project id"
        TogethrCreator.projects[projectId] != nil: "Failed to mint NFT: invalid project id"
      }

      let collection = getAccount(recipient)
          .getCapability(TogethrNFT.CollectionPublicPath)
          .borrow<&TogethrNFT.Collection{TogethrNFT.CollectionPublic}>()
          ?? panic("Failed to mint NFT: could not borrow capability from public collection")

      TogethrNFT.totalSupply = TogethrNFT.totalSupply + (1 as UInt64)
			collection.deposit(token: <-create TogethrNFT.NFT(id: TogethrNFT.totalSupply, projectId: projectId, ipfsHash: ipfsHash))
		}

	init() {
      self.CollectionStoragePath = /storage/TogethrNFTCollection
      self.CollectionPublicPath = /public/TogethrNFTCollection
      self.totalSupply = 0
      emit ContractInitialized()
	}
}
