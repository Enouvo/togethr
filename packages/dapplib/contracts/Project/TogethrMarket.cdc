import FungibleToken from "../Flow/FungibleToken.cdc"
import TogethrNFT from "./TogethrNFT.cdc"
import TogethrCreator from 0xecab3beb444ddcce
import FlowToken from "../Flow/FlowToken.cdc"
import NonFungibleToken from "../Flow/NonFungibleToken.cdc"

pub contract TogethrMarket {
    pub event ForSale(itemID: UInt64, price: UFix64)
    pub event NFTPurchased(itemID: UInt64, price: UFix64)
    pub event SaleWithdrawn(itemID: UInt64)
    pub let projects: {UInt64: Address}

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
                    "Failed to list an NFT for sale: invalid price"
            }

            var ownedNFTs = self.ownerCollection.borrow()!.getIDs()
            if (ownedNFTs.contains(itemID)) {
                self.forSale[itemID] = price
                TogethrMarket.projects[itemID] = self.address
                emit ForSale(itemID: itemID, price: price)
            }
        }

        pub fun unlistSale(itemID: UInt64) {
            self.forSale[itemID] = nil
            TogethrMarket.projects[itemID] = nil
            emit SaleWithdrawn(itemID: itemID)
        }

        pub fun purchase(itemID: UInt64, recipient: &TogethrNFT.Collection{TogethrNFT.CollectionPublic}, buyTokens: @FungibleToken.Vault) {
            pre {
                buyTokens.isInstance(Type<@FlowToken.Vault>()):
                    "Failed to purchase NFT: invalid token type, only flow tokens are supported"
                self.forSale[itemID] != nil:
                    "Failed to purchase NFT: invalid NFT ID"
                buyTokens.balance >= (self.forSale[itemID]!):
                    "Failed to purchase NFT: insufficient balance"
            }

            let price = self.forSale[itemID]!

            let projectId = self.ownerCollection.borrow()!.borrowEntireNFT(id: itemID)!.projectId
            let projectData = TogethrCreator.getProjectMetadata(projectId: projectId);
            let projectFunders = TogethrCreator.getProjectFunders(projectId: projectId);

            let amountToShare = price * UFix64(projectData.profitSharePercent) / 100.0;
            let sharePerToken = amountToShare / UFix64(projectData.tokenCount)

            for funderAddress in projectFunders.keys {
              let tokenCount = projectFunders[funderAddress]!
              let amount =  sharePerToken * UFix64(tokenCount)
              let funderVault <- buyTokens.withdraw(amount: amount)

              let funderVaultRef = getAccount(funderAddress).getCapability(/public/flowTokenReceiver)
                .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
                ?? panic("Failed to purchase NFT: could not borrow flow token receiver")

              funderVaultRef.deposit(from: <-funderVault)                    
            }

            let vaultRef = self.ownerVault.borrow() ?? panic("Failed to purchase NFT: could not borrow NFT owner's vault")
            vaultRef.deposit(from: <-buyTokens)
            
            let token <- self.ownerCollection.borrow()!.withdraw(withdrawID: itemID)
            recipient.deposit(token: <-token)

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

    pub fun getProjects(): {UInt64: Address} {
      return self.projects
    }

    pub fun createSaleCollection(address: Address, ownerVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>, ownerCollection: Capability<&TogethrNFT.Collection>): @SaleCollection {
        return <- create SaleCollection(_address: address, _vault: ownerVault, _collection: ownerCollection)
    }

    init() {
        self.projects = {}
        self.StoragePath = /storage/TogethrMarket
        self.PublicPath = /public/TogethrMarket
    }
}