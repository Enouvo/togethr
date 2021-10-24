
import FungibleToken from "../Flow/FungibleToken.cdc"
import TogethrFunder from "./TogethrFunder.cdc"
import FlowToken from "../Flow/FlowToken.cdc"

pub contract TogethrCreator {

  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath

  pub var nextProjectID: UInt32
  pub let projects: {UInt32: Address}

  pub resource interface ProjectInterface { 
    access(contract) fun addFunder(funder: Address, amount: UFix64)
  }

  pub struct ProjectData {
    pub let name: String
    pub let ipfsHash: String
    pub let tokenPrice: UFix64
    pub let tokenCount: UInt32
    pub let profitSharePercent: UInt32

    init(name: String, ipfsHash: String, tokenPrice: UFix64, tokenCount: UInt32, profitSharePercent: UInt32) {
      self.name = name
      self.ipfsHash = ipfsHash;
      self.tokenPrice = tokenPrice;
      self.tokenCount = tokenCount;
      self.profitSharePercent = profitSharePercent;
    }
  }

  pub resource Project: ProjectInterface {
    pub let projectId: UInt32
    pub let data: ProjectData
    pub let name: String
    pub let ipfsHash: String
    pub let tokenPrice: UFix64
    pub let tokenCount: UInt32
    pub let profitSharePercent: UInt32
    pub let funders: {Address: UFix64}
  
    
    init(projectId: UInt32, name: String, ipfsHash: String, tokenPrice: UFix64, tokenCount: UInt32, profitSharePercent: UInt32) {
      self.projectId = projectId
      self.data = ProjectData(name: String, ipfsHash: String, tokenPrice: UFix64, tokenCount: UInt32, profitSharePercent: UInt32)      
      self.funders = {}
    }

    access(contract) fun addFunder(funder: Address, amount: UFix64) {
      if let count = self.funders[funder] {
        self.funders[funder] = self.funders[funder]! + amount
      } else {
        self.funders[funder] = amount
      }
    }
  }

  pub resource interface PublicCollection {
    pub fun getProjectMetadata(projectId: UInt32): String?
    pub fun getProjectFunders(projectId: UInt32):  {Address: UFix64}?
    pub fun fundProject(projectId: UInt32, funder: Address, amount: UFix64, fundedProjects: &TogethrFunder.Collection, paymentVault: @FungibleToken.Vault)
  }

  pub resource Collection: PublicCollection {
    pub let creator: Address
    pub var projects: @{UInt32: Project}

    init(creator: Address) {
      self.creator = creator;
      self.projects <- {}
    }

    pub fun addProject(name: String, ipfsHash: String, tokenPrice: UFix64, tokenCount: UInt32, profitSharePercent: UInt32) {
      pre {
        name.length > 0 : "Failed to create project: project name is required."
      }
    
      let projectId = TogethrCreator.nextProjectID
      let project <- create Project(projectId: projectId, name: name, ipfsHash: ipfsHash, tokenPrice: tokenPrice, tokenCount: tokenCount, profitSharePercent: profitSharePercent)
      let newProject <- self.projects[projectId] <- project

      TogethrCreator.nextProjectID = TogethrCreator.nextProjectID + 1
      TogethrCreator.projects[projectId] = self.creator
      destroy newProject
    }

    pub fun getProjectFunders(projectId: UInt32):  {Address: UFix64}? {      
      pre {
        self.projects[projectId] != nil: "Failed to get project: invalid project id"
      } // TODO remove pre and use panic?

      return self.projects[projectId]?.funders
    }

    pub fun getProjectMetadata(projectId: UInt32): String? {
      pre {
        self.projects[projectId] != nil: "Failed to get project: invalid project id"
      } // TODO remove pre and use panic?

      return self.projects[projectId]?.name
    }

    pub fun fundProject(projectId: UInt32, funder: Address, amount: UFix64, fundedProjects: &TogethrFunder.Collection, paymentVault: @FungibleToken.Vault) {
      pre {
        self.projects[projectId] != nil: "Failed to fund project: invalid project id"
        paymentVault.balance >= amount : "Could not mint dappy: payment balance insufficient." 
      }
      self.projects[projectId]?.addFunder(funder: funder, amount: amount)
      fundedProjects.addProject(projectId: projectId, amount: amount)

      let vaultRef = getAccount(self.creator)
          .getCapability(/public/flowTokenReceiver)
          .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
          ?? panic("Could not borrow Balance reference to the Vault")

      vaultRef.deposit(from: <-paymentVault)
    }

    destroy() {
      destroy self.projects
    }
  }

  pub fun createEmptyCollection(address: Address): @Collection {
    return <- create Collection(creator: address)
  }

  pub fun getProjectCreatorAddress(projectId: UInt32): Address? {
    return self.projects[projectId]
  } 

  pub fun getProjects() {UInt32: Address} {
    return projects
  }

  init() {
    self.nextProjectID = 1
    self.projects = {}

    self.CollectionStoragePath = /storage/ProjectCollection
    self.CollectionPublicPath = /public/ProjectCollection
  }
}