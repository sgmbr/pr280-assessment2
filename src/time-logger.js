/* jshint undef: true, unused: true, esversion: 6, asi: true */

class TimeLogger {
    constructor() {
        this.allMyProjects = []
        this.allMyTimeLogs = []
        this.idCounter = 0
    }

    generateId() {
        this.idCounter += 1
        return this.idCounter
    }

    addProject(newProjectName) {
        let newId = this.generateId()
        let newProject = new Project(newId, newProjectName)
        this.allMyProjects.push(newProject)
    }

    findProject(projectName) {
        let theProject = this.allMyProjects.find(aProject => aProject.name == projectName)
        return theProject
    }

    addTimeLog(theProject, thePhase, newDate, newStart, newStop, newInterruption, newComment) {
        let newId = this.generateId()
        let newTimeLog = new TimeLog(newId, theProject, thePhase, newDate, newStart, newStop, newInterruption, newComment)
        this.allMyTimeLogs.push(newTimeLog)
    }

}
