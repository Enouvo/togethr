
import FungibleToken from "../Flow/FungibleToken.cdc"
import FlowToken from "../Flow/FlowToken.cdc"

pub contract TogethrFunder {

  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath

  pub resource interface PublicCollection {
    pub fun getFundedProjects(): {UInt32: UInt32}
    pub fun addProject(projectId: UInt32, tokenCount: UInt32)
  }

  pub resource Collection: PublicCollection {
    pub var fundedProjects: {UInt32: UInt32}

    init() {
      self.fundedProjects = {}
    }

    pub fun addProject(projectId: UInt32, tokenCount: UInt32) {
      if let count = self.fundedProjects[projectId] {
        self.fundedProjects[projectId] = self.fundedProjects[projectId]! + tokenCount
      } else {
        self.fundedProjects[projectId] = tokenCount
      }
    }

    pub fun getFundedProjects(): {UInt32: UInt32} {
      return self.fundedProjects
    }
  }

  pub fun createEmptyFundedProjects(): @Collection {
    return <- create Collection()
  }

  init() {
    self.CollectionStoragePath = /storage/TogethrFunder
    self.CollectionPublicPath = /public/TogethrFunder
  }
}