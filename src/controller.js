/* jshint undef: true, unused: true, esversion: 6, asi: true */

class MainController {
    constructor(timeLogger, timeUtil) {
        this.timeLogger = timeLogger
        this.projects = this.timeLogger.projects
        this.phases = this.timeLogger.phases
        this.timeUtil = timeUtil

        this.initialiseInput()
    }

    initialiseInput() {
        this.selectedProject = ''
        this.selectedPhase = ''
        this.date = new Date()
        this.start = this.getCurrentTime()
        this.stop = this.getCurrentTime()
        this.interruption = "00:00"
        this.comment = ''
    }

    // format time to fit input[time]
    getCurrentTime() {
        let now = new Date()
        now.setSeconds(0)
        now.setMilliseconds(0)
        return now
    }

    convertInterruptionToDate() {
        // ISO Dates format. Z indicates UTC.
        // https://www.w3schools.com/js/js_date_formats.asp
        return new Date(`1970-01-01T${this.interruption}Z`)
    }

    buildStartDate() {
        let year = this.date.getFullYear()
        let month = this.date.getMonth()
        let date = this.date.getDate()
        let hours = this.start.getHours()
        let minutes = this.start.getMinutes()

        let start = new Date(year, month, date, hours, minutes)
        return start
    }

    showDeltaTime() {
        let interruption = this.convertInterruptionToDate()
        let delta = this.timeLogger.getDeltaTime(this.start, this.stop, interruption)
        let out = this.timeUtil.getUTCHHMM(delta)
        return out
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
        let interruption = this.convertInterruptionToDate()
        let start = this.buildStartDate()
        this.timeLogger.addTimeLog(this.selectedProject, this.selectedPhase, start, this.stop, interruption, this.comment)
        console.log(this.timeLogger)
        this.initialiseInput()
    }
}

MainController.$inject = ['timeLogger', 'timeUtil']
