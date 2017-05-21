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

    getDeltaTime(start, stop, interruption) {
        let delta = new Date(stop - start - interruption)
        return delta
    }

    addTimeLog(theProject, thePhase, newDate, newStart, newStop, newInterruption, newComment) {
        let newId = this.generateId()
        let newDelta = this.getDeltaTime(newStart, newStop, newInterruption)
        let newTimeLog = new TimeLog(newId, theProject, thePhase, newDate, newStart, newStop, newInterruption, newDelta, newComment)
        this.allMyTimeLogs.push(newTimeLog)
    }

}
