
import FungibleToken from "../Flow/FungibleToken.cdc"
import TogethrFunder from "./TogethrFunder.cdc"
import FlowToken from "../Flow/FlowToken.cdc"

pub contract TogethrCreator {

  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath

  pub var nextProjectID: UInt32
  pub let projects: {UInt32: Address}

  pub resource interface ProjectInterface { 
    access(contract) fun addFunder(funder: Address, tokenCount: UInt32)
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
    pub let funders: {Address: UInt32}
  
    init(projectId: UInt32, name: String, ipfsHash: String, tokenPrice: UFix64, tokenCount: UInt32, profitSharePercent: UInt32) {
      self.projectId = projectId
      self.data = ProjectData(name: name, ipfsHash: ipfsHash, tokenPrice: tokenPrice, tokenCount: tokenCount, profitSharePercent: profitSharePercent)      
      self.funders = {}
    }

    access(contract) fun addFunder(funder: Address, tokenCount: UInt32) {
      if let count = self.funders[funder] {
        self.funders[funder] = self.funders[funder]! + tokenCount
      } else {
        self.funders[funder] = tokenCount
      }
    }
  }

  pub resource interface PublicCollection {
    pub fun getProjectMetadata(projectId: UInt32): ProjectData
    pub fun getProjectFunders(projectId: UInt32):  {Address: UInt32}?
    pub fun fundProject(funder: Address, projectId: UInt32, tokenCount: UInt32, paymentVault: @FungibleToken.Vault)
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

    pub fun getProjectFunders(projectId: UInt32):  {Address: UInt32}? {      
      pre {
        self.projects[projectId] != nil: "Failed to get project: invalid project id"
      } // TODO remove pre and use panic?

      return self.projects[projectId]?.funders
    }

    pub fun getProjectMetadata(projectId: UInt32): ProjectData {
      pre {
        self.projects[projectId] != nil: "Failed to get project: invalid project id"
      } // TODO remove pre and use panic?

      return self.projects[projectId]?.data!
    }

    pub fun fundProject(funder: Address, projectId: UInt32, tokenCount: UInt32, paymentVault: @FungibleToken.Vault) {
      pre {
        self.projects[projectId] != nil: "Failed to fund project: invalid project id"
        tokenCount > 0 : "Invalid token count" 
        TogethrCreator.getRemainingTokenCount(projectId: projectId) >= tokenCount : "Invalid token count" 
        paymentVault.balance >= TogethrCreator.getProjectMetadata(projectId: projectId)!.tokenPrice * UFix64(tokenCount)  : "Could not mint dappy: payment balance insufficient." 
      }
      self.projects[projectId]?.addFunder(funder: funder, tokenCount: tokenCount)
      
      let funderCollection = getAccount(funder).getCapability<&TogethrFunder.Collection{TogethrFunder.PublicCollection}>(TogethrFunder.CollectionPublicPath)
                            .borrow()
                            ?? panic("Could not borrow capability from public collection")
      funderCollection.addProject(projectId: projectId, tokenCount: tokenCount)

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

  pub fun getProjectMetadata(projectId: UInt32): TogethrCreator.ProjectData {
    let creator = self.projects[projectId]!
    let collection = getAccount(creator).getCapability<&TogethrCreator.Collection{TogethrCreator.PublicCollection}>(TogethrCreator.CollectionPublicPath)
                            .borrow()
                            ?? panic("Could not borrow capability from public collection")
    return collection.getProjectMetadata(projectId: projectId)!
  } 

  pub fun getProjectFunders(projectId: UInt32): {Address: UInt32} {
    let creator = self.projects[projectId]!
    let collection = getAccount(creator).getCapability<&TogethrCreator.Collection{TogethrCreator.PublicCollection}>(TogethrCreator.CollectionPublicPath)
                            .borrow()
                            ?? panic("Could not borrow capability from public collection")
    return collection.getProjectFunders(projectId: projectId)!
  } 

  pub fun getRemainingTokenCount(projectId: UInt32): UInt32 {
    let funders =  TogethrCreator.getProjectFunders(projectId: projectId)!
    let projectData =  TogethrCreator.getProjectMetadata(projectId: projectId)! 

    var totalTokens = (0 as UInt32);
    for value in funders.values {
      totalTokens = totalTokens + value
    }

    return projectData.tokenCount - totalTokens
  } 

  pub fun getProjects(): {UInt32: Address} {
    return self.projects
  }

  init() {
    self.nextProjectID = 1
    self.projects = {}

    self.CollectionStoragePath = /storage/ProjectCollection
    self.CollectionPublicPath = /public/ProjectCollection
  }
}