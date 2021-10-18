import NonFungibleToken from "../Flow/NonFungibleToken.cdc"
import TogethrCreator from "./TogethrCreator.cdc"

pub contract TogethrNFT: NonFungibleToken {

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event Minted(id: UInt64, typeID: UInt64)

    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    // pub let MinterStoragePath: StoragePath

    pub var totalSupply: UInt64

    pub resource NFT: NonFungibleToken.INFT {
        pub let id: UInt64
        pub let projectId: UInt32
        init(id: UInt64, projectId: UInt32) {
            self.id = id
            self.projectId = projectId
        }
    }

    pub resource interface CollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun getIDs(): [UInt64]
    }

    pub resource Collection: CollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")
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


  pub fun mintNFT(recipient: Address, projectId: UInt32) {
      pre {
        TogethrCreator.projects[projectId] == recipient: "Invalid project id"
        TogethrCreator.projects[projectId] != nil: "Nil project id"
      }

      let collection = getAccount(recipient)
          .getCapability(TogethrNFT.CollectionPublicPath)
          .borrow<&TogethrNFT.Collection{TogethrNFT.CollectionPublic}>()
          ?? panic("Could not borrow Balance reference to the Vault")

			collection.deposit(token: <-create TogethrNFT.NFT(id: TogethrNFT.totalSupply, projectId: projectId))

      TogethrNFT.totalSupply = TogethrNFT.totalSupply + (1 as UInt64)
		}

	init() {
      self.CollectionStoragePath = /storage/TogethrNFTCollection
      self.CollectionPublicPath = /public/TogethrNFTCollection
      // self.MinterStoragePath = /storage/TogethrNFTMinter

      self.totalSupply = 0

      // let minter <- create NFTMinter()
      // self.account.save(<-minter, to: self.MinterStoragePath)

      emit ContractInitialized()
	}
}

// Mint project as NFT
// List NFT
// Get list of all items on sale
// Purchase (distribute money)