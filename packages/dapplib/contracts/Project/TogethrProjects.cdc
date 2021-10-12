
import FungibleToken from "../Flow/FungibleToken.cdc"
import FlowToken from Flow.FlowToken

pub contract TogethrProjects {
  access(self) var projects: @{UInt32: Project}
  
  pub let FundedProjectsStoragePath: StoragePath
  pub let FundedProjectsPublicPath: PublicPath

  pub var nextProjectID: UInt32

  pub resource interface IProject { 
    access(contract) fun addFunder(funder: Address, amount: UFix64)
  }

  pub resource Project: IProject{
    pub let projectId: UInt32
    pub let name: String
    pub let creator: Address
    pub let funders: {Address: UFix64}
    
    pub let vault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
    // access(self) let vault: Capability<&FlowToken.Vault{FungibleToken.Receiver}> TODO fix access by passing vault to fun addFunder

    init(vault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>, creator: Address, projectId: UInt32, name: String) {
      self.vault = vault
      self.creator = creator
      self.projectId = projectId
      self.name = name
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

  pub fun addProject(vault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>, creator: Address, name: String) {
    pre {
      name.length > 0 : "Failed to create project: project name is required."
    }
    
    let projectId = self.nextProjectID
    let project <- create Project(vault: vault, creator: creator, projectId: projectId, name: name)

    let newProject <- self.projects[projectId] <- project
    destroy newProject
  }

  pub fun getProjects(): [UInt32] {
    return self.projects.keys
  } 

  pub fun getProject(projectId: UInt32): {Address: UFix64}? {
    pre {
      self.projects[projectId] != nil: "Failed to get project: invalid project id"
    }
    return self.projects[projectId]?.funders
  } 

  pub fun fundProject(projectId: UInt32, funder: Address, amount: UFix64, fundedProjects: &TogethrProjects.FundedProjects, paymentVault: @FungibleToken.Vault) {
    pre {
      self.projects[projectId] != nil: "Failed to fund project: invalid project id"
      paymentVault.balance >= amount : "Could not mint dappy: payment balance insufficient." 
    }
    self.projects[projectId]?.addFunder(funder: funder, amount: amount)
    fundedProjects.addProject(projectId: projectId, amount: amount)

    // let vaultRef = self.projects[projectId]?.vault.borrow()

    let vaultRef = self.projects[projectId]?.vault?.borrow()
                ?? panic("Could not borrow reference to owner token vault")

    vaultRef!.deposit(from: <-paymentVault)
    // TODO send to creator
    // destroy paymentVault
  }

  pub resource interface IFundedProjects {
    pub fun getFundedProjects(): {UInt32: UFix64}
    access(contract) fun addProject(projectId: UInt32, amount: UFix64)
  }

  pub resource FundedProjects: IFundedProjects {
    pub var fundedProjects: {UInt32: UFix64}

    init() {
      self.fundedProjects = {}
    }

    access(contract) fun addProject(projectId: UInt32, amount: UFix64) {
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

  pub fun createEmptyFundedProjects(): @FundedProjects {
    return <- create FundedProjects()
  }

  init() {
    self.projects <- {}
    self.nextProjectID = 1

    self.FundedProjectsStoragePath = /storage/FundedProjects
    self.FundedProjectsPublicPath = /public/FundedProjects
  }
}