
import FungibleToken from "../Flow/FungibleToken.cdc"

pub contract TogethrProjects {
  access(self) var projects: {UInt32: Project}
  
  pub var nextProjectID: UInt32

  pub struct Project {
    pub let projectId: UInt32
    pub let name: String
    pub let creator: Address
    
    init(creator: Address, projectId: UInt32, name: String) {
      self.creator = creator
      self.projectId = projectId
      self.name = name
    }
  }

  pub fun addProject(creator: Address, name: String): UInt32 {
      pre {
        name.length > 0 : "Failed to create project: project name is required."
      }
      let projectId = TogethrProjects.nextProjectID
      TogethrProjects.projects[projectId] = Project(creator: creator, projectId: projectId, name: name)
      TogethrProjects.nextProjectID = TogethrProjects.nextProjectID + 1
      return projectId
  }

  pub fun getProjects(): {UInt32: Project} {
      return TogethrProjects.projects
  } 

  init() {
    self.projects = {}
    self.nextProjectID = 1
  }
}