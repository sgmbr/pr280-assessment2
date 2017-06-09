/* jshint undef: true, unused: true, esversion: 6, asi: true */

class EditController {
    constructor(timeLogger, dateProcessor) {
        this.timeLogger = timeLogger
        this.dateProcessor = dateProcessor

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
        let interruption = this.dateProcessor.timeStringToDate(this.interruption)
        let delta = this.dateProcessor.calcDeltaTime(this.start, this.stop, interruption)
        return delta
    }

    editTimeLog(id) {
        this.targetTimeLog = this.timeLogger.findTimeLog(id)
        this.id = id

        this.selectedProject = this.targetTimeLog.myProject
        this.selectedPhase = this.targetTimeLog.myPhase
        this.date = this.targetTimeLog.start
        this.start = this.dateProcessor.startDateToTime(this.targetTimeLog.start)
        this.stop = this.targetTimeLog.stop
        this.interruption = this.dateProcessor.getTimeString(this.targetTimeLog.interruption.getTime())
        this.comment = this.targetTimeLog.comment

        $('#edit').modal('show')
    }

    updateTimeLog() {
        let start = this.dateProcessor.buildStartDate(this.date, this.start)
        let interruption = this.dateProcessor.timeStringToDate(this.interruption)
        let delta = this.dateProcessor.calcDeltaTime(this.start, this.stop, interruption)

        this.timeLogger.updateTimeLog(
            this.id, this.selectedProject, this.selectedPhase,
            start, this.stop, interruption, delta, this.comment
        )
    }

}

EditController.$inject = ['timeLogger', 'dateProcessor']
