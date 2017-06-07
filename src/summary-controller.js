/* jshint undef: true, unused: true, esversion: 6, asi: true */

class SummaryController {
    constructor(timeLogger, dateProcessor) {
        this.timeLogger = timeLogger
        this.dateProcessor = dateProcessor
    }

    getInterruptions() {
        return this.timeLogger.allMyTimeLogs.map(timeLog => timeLog.interruption)
    }

    getDeltas() {
        return this.timeLogger.allMyTimeLogs.map(timeLog => timeLog.delta)
    }

    showTimeSum(dates) {
        let sum = this.dateProcessor.getDateSum(dates)
        return this.dateProcessor.showTime(sum)
    }

    showTimeMean(dates) {
        let mean = this.dateProcessor.getDateMean(dates)
        return this.dateProcessor.showTime(mean)
    }

    showCorrelationCoefficient() {
        let result = this.dateProcessor.getCorrelationCoefficient(this.getInterruptions(), this.getDeltas())
        return result
    }

}

SummaryController.$inject = ['timeLogger', 'dateProcessor']
