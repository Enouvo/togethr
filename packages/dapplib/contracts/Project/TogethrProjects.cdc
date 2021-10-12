
import FungibleToken from "../Flow/FungibleToken.cdc"

pub contract TogethrProjects {
  access(self) var projects: @{UInt32: Project}
  
  pub let FundedProjectsStoragePath: StoragePath
  pub let FundedProjectsPublicPath: PublicPath

  pub var nextProjectID: UInt32

  pub resource interface IProject { 
    access(contract) fun addFunder(funder: Address, amount: UInt64)
  }

  pub resource Project: IProject{
    pub let projectId: UInt32
    pub let name: String
    pub let creator: Address
    pub let funders: {Address: UInt64}
    
    init(creator: Address, projectId: UInt32, name: String) {
      self.creator = creator
      self.projectId = projectId
      self.name = name
      self.funders = {}
    }

    access(contract) fun addFunder(funder: Address, amount: UInt64) {
      if let count = self.funders[funder] {
        self.funders[funder] = self.funders[funder]! + amount
      } else {
        self.funders[funder] = amount
      }
    }
  }

  pub fun addProject(creator: Address, name: String) {
    pre {
      name.length > 0 : "Failed to create project: project name is required."
    }
    
    let projectId = self.nextProjectID
    let project <- create Project(creator: creator, projectId: projectId, name: name)

    let newProject <- self.projects[projectId] <- project
    destroy newProject
  }

  pub fun getProjects(): [UInt32] {
    return self.projects.keys
  } 

  pub fun getProject(projectId: UInt32): {Address: UInt64}? {
    pre {
      self.projects[projectId] != nil: "Failed to get project: invalid project id"
    }
    return self.projects[projectId]?.funders
  } 

  pub fun fundProject(projectId: UInt32, funder: Address, amount: UInt64, fundedProjects: &TogethrProjects.FundedProjects) {
    pre {
      self.projects[projectId] != nil: "Failed to fund project: invalid project id"
    }
    self.projects[projectId]?.addFunder(funder: funder, amount: amount)
    fundedProjects.addProject(projectId: projectId, amount: amount)
  }

  pub resource interface IFundedProjects {
    pub fun getFundedProjects(): {UInt32: UInt64}
    access(contract) fun addProject(projectId: UInt32, amount: UInt64)
  }

  pub resource FundedProjects: IFundedProjects {
    pub var fundedProjects: {UInt32: UInt64}

    init() {
      self.fundedProjects = {}
    }

    access(contract) fun addProject(projectId: UInt32, amount: UInt64) {
      if let count = self.fundedProjects[projectId] {
        self.fundedProjects[projectId] = self.fundedProjects[projectId]! + amount
      } else {
        self.fundedProjects[projectId] = amount
      }
    }

    pub fun getFundedProjects(): {UInt32: UInt64} {
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