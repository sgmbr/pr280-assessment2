/* jshint undef: true, unused: true, esversion: 6, asi: true */

class FileController {
    constructor(timeLogger, dateProcessor, message, parser) {
        this.timeLogger = timeLogger
        this.dateProcessor = dateProcessor
        this.message = message.getMessage()
        this.parser = parser
    }

    checkFile() {
        try {
            this.timeLogs = this.parser.parseTimeLogCsv(this.message.list[0])
            $('#preview').modal('show')
        } catch (error) {
            $('#file-read-error').modal('show')
        }
    }

    upload() {
        this.timeLogs.forEach(timeLog => {
            let project = timeLog.project
            let phase = timeLog.phase
            let date = new Date(timeLog.date)
            let start = new Date(`1970-01-01T${timeLog.start}:00`)
            let stop = new Date(`1970-01-01T${timeLog.stop}:00`)
            let interruption = this.dateProcessor.convertInterruptionToDate(timeLog.interruption)
            let comment = timeLog.comment

            if (!this.timeLogger.findProject(project)) {
                this.timeLogger.addProject(project)
            }
            if (!this.timeLogger.findPhase(phase)) {
                this.timeLogger.addPhase(phase)
            }

            let delta = this.dateProcessor.getDeltaTime(start, stop, interruption)
            start = this.dateProcessor.buildStartDate(date, start)
            this.timeLogger.addTimeLog(project, phase, start, stop, interruption, delta, comment)
        })
    }
}

FileController.$inject = ['timeLogger', 'dateProcessor', 'message', 'parser']
