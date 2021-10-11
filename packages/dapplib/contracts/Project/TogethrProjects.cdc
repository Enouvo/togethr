
import FungibleToken from "../Flow/FungibleToken.cdc"

pub contract TogethrProjects {
  access(self) var projects: @{UInt32: Project}
  
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

  pub fun fundProject(projectId: UInt32, funder: Address, amount: UInt64) {
    pre {
      self.projects[projectId] != nil: "Failed to fund project: invalid project id"
    }
    self.projects[projectId]?.addFunder(funder: funder, amount: amount)
  }

  init() {
    self.projects <- {}
    self.nextProjectID = 1
  }
}