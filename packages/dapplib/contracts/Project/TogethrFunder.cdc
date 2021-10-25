
import FungibleToken from "../Flow/FungibleToken.cdc"
import FlowToken from "../Flow/FlowToken.cdc"


pub contract TogethrFunder {

  pub let StoragePath: StoragePath
  pub let PublicPath: PublicPath

  pub resource interface PublicCollection {
    pub fun getFundedProjects(): {UInt32: UFix64}
    pub fun addProject(projectId: UInt32, amount: UFix64)
  }

  pub resource Collection: PublicCollection {
    pub var fundedProjects: {UInt32: UFix64}

    init() {
      self.fundedProjects = {}
    }

    pub fun addProject(projectId: UInt32, amount: UFix64) {
      if let count = self.fundedProjects[projectId] {
        self.fundedProjects[projectId] = self.fundedProjects[projectId]! + amount
      } else {
        self.fundedProjects[projectId] = amount
      }
    }

    pub fun getFundedProjects(): {UInt32: UFix64} {
      return self.fundedProjects
    }
  }

  pub fun createEmptyFundedProjects(): @Collection {
    return <- create Collection()
  }

  init() {
    self.StoragePath = /storage/TogethrFunder
    self.PublicPath = /public/TogethrFunder
  }
}