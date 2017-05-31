/* jshint undef: true, unused: true, esversion: 6, asi: true */

class MainController {
    constructor(timeLogger, dateProcessor) {
        this.timeLogger = timeLogger
        this.dateProcessor = dateProcessor
        this.projects = this.timeLogger.projects
        this.phases = this.timeLogger.phases

        this.initialiseForm()
    }

    initialiseForm() {
        this.selectedProject = ''
        this.selectedPhase = ''
        this.date = new Date()
        this.start = this.dateProcessor.getCurrentTime()
        this.stop = this.dateProcessor.getCurrentTime()
        this.interruption = "00:00"
        this.comment = ''
    }

    showDeltaTime() {
        let interruption = this.dateProcessor.convertInterruptionToDate(this.interruption)
        let delta = this.dateProcessor.getDeltaTime(this.start, this.stop, interruption)
        return delta
        //let out = this.dateProcessor.getUTCHHMM(delta)
        //return out
    }

    addProject() {
        let newProjectName = prompt('Create new project').trim()
        if (newProjectName !== '') {
            this.timeLogger.addProject(newProjectName)
        }
    }

    addPhase() {
        let newPhaseName = prompt('Create new phase').trim()
        if (newPhaseName !== '') {
            this.timeLogger.addPhase(newPhaseName)
        }
    }

    addTimeLog() {
        let interruption = this.dateProcessor.convertInterruptionToDate(this.interruption)
        let delta = this.dateProcessor.getDeltaTime(this.start, this.stop, interruption)
        let start = this.dateProcessor.buildStartDate(this.date, this.start)
        this.timeLogger.addTimeLog(this.selectedProject, this.selectedPhase, start, this.stop, interruption, delta, this.comment)
        this.initialiseForm()
    }
}

MainController.$inject = ['timeLogger', 'dateProcessor']
