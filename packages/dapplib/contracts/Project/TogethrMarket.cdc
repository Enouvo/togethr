import FungibleToken from "../Flow/FungibleToken.cdc"
import TogethrNFT from "./TogethrNFT.cdc"
import FlowToken from Flow.FlowToken
import NonFungibleToken from "../Flow/NonFungibleToken.cdc"

pub contract TogethrMarket {
    pub event ForSale(itemID: UInt64, price: UFix64)
    pub event NFTPurchased(itemID: UInt64, price: UFix64)
    pub event SaleWithdrawn(itemID: UInt64)

    pub let StoragePath: StoragePath
    pub let PublicPath: PublicPath

    pub resource interface SalePublic {
        pub fun purchase(itemID: UInt64, recipient: &TogethrNFT.Collection{TogethrNFT.CollectionPublic}, buyTokens: @FungibleToken.Vault)
        pub fun idPrice(itemID: UInt64): UFix64?
        pub fun getIDs(): [UInt64]
    }

    pub resource SaleCollection: SalePublic {

        pub var forSale: {UInt64: UFix64}

        access(self) let ownerVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
        access(self) let ownerCollection: Capability<&TogethrNFT.Collection>

        init (_vault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>, _collection: Capability<&TogethrNFT.Collection>) {
            self.forSale = {}
            self.ownerVault = _vault
            self.ownerCollection = _collection
        }

        pub fun listForSale(itemID: UInt64, price: UFix64) {
            pre {
                price > 0.0:
                    "Cannot list a NFT for 0.0"
            }

            log("list for sale")
            log(itemID)
            var ownedNFTs = self.ownerCollection.borrow()!.getIDs()
            log(ownedNFTs)
            log("===")
            if (ownedNFTs.contains(itemID)) {
                self.forSale[itemID] = price
                emit ForSale(itemID: itemID, price: price)
            }
        }

        pub fun unlistSale(itemID: UInt64) {
            self.forSale[itemID] = nil

            emit SaleWithdrawn(itemID: itemID)
        }

        pub fun purchase(itemID: UInt64, recipient: &TogethrNFT.Collection{TogethrNFT.CollectionPublic}, buyTokens: @FungibleToken.Vault) {
            pre {
                buyTokens.isInstance(Type<@FlowToken.Vault>()):
                    "Only Flow Tokens are supported for purchase."
                self.forSale[itemID] != nil:
                    "No NFT matching this itemID for sale!"
                buyTokens.balance >= (self.forSale[itemID]!):
                    "Not enough tokens to buy the NFT!"
            }

            // get project by id
            // get Flow Vault of the creator
            // get funders flow wallet


            // get the value out of the optional
            let price = self.forSale[itemID]!

            let vaultRef = self.ownerVault.borrow()
                ?? panic("Could not borrow reference to owner token vault")
            
            // deposit the user's tokens into the owners vault
            vaultRef.deposit(from: <-buyTokens)
            
            // remove the NFT from the owner's NFT Collection
            let token <- self.ownerCollection.borrow()!.withdraw(withdrawID: itemID)

            // deposit the NFT into the buyers NFT Collection
            recipient.deposit(token: <-token)

            // unlist the sale
            self.unlistSale(itemID: itemID)

            emit NFTPurchased(itemID: itemID, price: price)
        }

        pub fun idPrice(itemID: UInt64): UFix64? {
           log("=====")
            log(itemID)
            log("=====")
            log(self.forSale[itemID])
            log("=====")
            return self.forSale[itemID]
        }

        pub fun getIDs(): [UInt64] {
            return self.forSale.keys
        }
    }

    pub fun createSaleCollection(ownerVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>, ownerCollection: Capability<&TogethrNFT.Collection>): @SaleCollection {
        return <- create SaleCollection(_vault: ownerVault, _collection: ownerCollection)
    }

    init() {
        self.StoragePath = /storage/TogethrMarket
        self.PublicPath = /public/TogethrMarket
    }
}