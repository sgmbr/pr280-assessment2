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
        if (newProject.trim() !== '') {
            this.projects.push(newProject)
        }
    }

    addPhase(newPhase) {
        if (newPhase.trim() !== '') {
            this.phases.push(newPhase)
        }
    }

    getDeltaTime(start, stop, interruption) {
        interruption = new Date(`1970-01-01T${interruption}Z`)
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
