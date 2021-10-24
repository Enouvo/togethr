import FungibleToken from "../Flow/FungibleToken.cdc"
import TogethrNFT from "./TogethrNFT.cdc"
import TogethrCreator from "./TogethrCreator.cdc"
import FlowToken from "../Flow/FlowToken.cdc"
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

        access(self) let address: Address
        access(self) let ownerVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
        access(self) let ownerCollection: Capability<&TogethrNFT.Collection>

        init (_address: Address, _vault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>, _collection: Capability<&TogethrNFT.Collection>) {
            self.forSale = {}
            self.address = _address
            self.ownerVault = _vault
            self.ownerCollection = _collection
        }

        pub fun listForSale(itemID: UInt64, price: UFix64) {
            pre {
                price > 0.0:
                    "Cannot list a NFT for 0.0"
            }

            log("====")
            log(self.ownerCollection.borrow()!.borrowEntireNFT(id: itemID))
            log("====")

            var ownedNFTs = self.ownerCollection.borrow()!.getIDs()
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

          let projects = getAccount(self.address)
              .getCapability(TogethrCreator.CollectionPublicPath)
              .borrow<&TogethrCreator.Collection{TogethrCreator.PublicCollection}>()
              ?? panic("Could not borrow creator projects")


          let projectId = self.ownerCollection.borrow()!.borrowEntireNFT(id: itemID)!.projectId

           let funders = projects.getProjectFunders(projectId: projectId);

           log(funders!.keys[0])

           let funderVault <- buyTokens.withdraw(amount: UFix64(1))

           let funderVaultRef = getAccount(funders!.keys[0])
              .getCapability(/public/flowTokenReceiver)
              .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
              ?? panic("Could not borrow Balance reference to the Vault")

            funderVaultRef.deposit(from: <-funderVault)

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
           return self.forSale[itemID]
        }

        pub fun getIDs(): [UInt64] {
            return self.forSale.keys
        }
    }

    pub fun createSaleCollection(address: Address, ownerVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>, ownerCollection: Capability<&TogethrNFT.Collection>): @SaleCollection {
        return <- create SaleCollection(_address: address, _vault: ownerVault, _collection: ownerCollection)
    }

    init() {
        self.StoragePath = /storage/TogethrMarket
        self.PublicPath = /public/TogethrMarket
    }
}