import FungibleToken from Flow.FungibleToken
import FlowToken from Flow.FlowToken

pub fun main(account: Address): UFix64 {

    let vaultRef = getAccount(account)
        .getCapability(/public/flowTokenBalance)
        .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow flow token balance")

    return vaultRef.balance
}  