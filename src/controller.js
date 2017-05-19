/* jshint undef: true, unused: true, esversion: 6, asi: true */

class MainController {
    constructor() {
        this.timeLogger = new TimeLogger()
        this.projects = this.timeLogger.allMyProjects
        this.selectedProject = ''
        this.phases = this.selectedProject ? this.timeLogger.findProject(this.selectedProject).allMyPhases : ''
        this.selectedPhase = ''
        this.date = new Date()
        this.start = this.getCurrentTime()
        this.stop = this.getCurrentTime()
        this.interruption = "00:00"
    }

    // format time to fit input[time]
    getCurrentTime() {
        let now = this.date
        now.setSeconds(0)
        now.setMilliseconds(0)
        return now
    }

    getDeltaTime() {
        function zeroPadding(number) {
            return (number < 10) ? "0" + number : number
        }
        let interruption = new Date(`1970-01-01T${this.interruption}Z`)
        let delta = new Date(this.stop - this.start - interruption)
        let h = zeroPadding(delta.getUTCHours())
        let m = zeroPadding(delta.getUTCMinutes())
        //return delta
        return `${h}:${m}`
    }

    addProject() {
        let newProjectName = prompt('Create new project')
        if (newProjectName !== '') {
            this.timeLogger.addProject(newProjectName)
        }
    }

    addPhase() {
        let newPhaseName = prompt('Create new phase')
        if (newPhaseName !== '') {
            let theProject = this.timeLogger.findProject(this.selectedProject)
            theProject.addPhase(newPhaseName)
        }
    }
}
