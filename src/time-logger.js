/* jshint undef: true, unused: true, esversion: 6, asi: true */

class TimeLogger {
    constructor() {
        this.projects = []
        this.phases = []
        this.allMyTimeLogs = []
        this.idCounter = 0
    }

    generateId() {
        this.idCounter += 1
        return this.idCounter
    }

    addProject(newProject) {
        newProject = newProject.trim()
        if (newProject !== '') {
            this.projects.push(newProject)
        }
    }

    addPhase(newPhase) {
        newPhase = newPhase.trim()
        if (newPhase !== '') {
            this.phases.push(newPhase)
        }
    }

    addTimeLog(theProject, thePhase, newStart, newStop, newInterruption, newDelta, newComment) {
        let newId = this.generateId()
        let newTimeLog = new TimeLog(newId, theProject, thePhase, newStart, newStop, newInterruption, newDelta, newComment)
        this.allMyTimeLogs.push(newTimeLog)
    }

    findProject(project) {
        return this.projects.includes(project)
    }

    findPhase(phase) {
        return this.phases.includes(phase)
    }

    findTimeLog(id) {
        let found = this.allMyTimeLogs.find(timeLog => timeLog.id === id )
        return found
    }

    deleteTimeLog(id) {
        let index = this.allMyTimeLogs.findIndex(timeLog => timeLog.id === id)
        this.allMyTimeLogs.splice(index, 1)
    }

    updateTimeLog(id, project, phase, start, stop, interruption, delta, comment) {
        let targetTimeLog = this.findTimeLog(id)
        targetTimeLog.update(project, phase, start, stop, interruption, delta, comment)
    }
}
