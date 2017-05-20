/* jshint undef: true, unused: true, esversion: 6, asi: true */

class MainController {
    constructor() {
        this.timeLogger = new TimeLogger()
        this.projects = this.timeLogger.projects
        this.phases = this.timeLogger.phases

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

    showDeltaTime() {
        function zeroPadding(number) {
            return (number < 10) ? "0" + number : number
        }
        let delta = this.timeLogger.getDeltaTime(this.start, this.stop, this.interruption)
        let h = zeroPadding(delta.getUTCHours())
        let m = zeroPadding(delta.getUTCMinutes())
        //return delta
        return `${h}:${m}`
    }

    addProject() {
        let newProjectName = prompt('Create new project')
        if (newProjectName.trim() !== '') {
            this.timeLogger.addProject(newProjectName)
        }
    }

    addPhase() {
        let newPhaseName = prompt('Create new phase')
        if (newPhaseName.trim() !== '') {
            this.timeLogger.addPhase(newPhaseName)
        }
    }

    addTimeLog() {
        this.timeLogger.addTimeLog(this.selectedProject, this.selectedPhase, this.date, this.start, this.stop, this.interruption, this.comment)
        console.log(this.timeLogger)
        this.initialiseInput()
    }
}
