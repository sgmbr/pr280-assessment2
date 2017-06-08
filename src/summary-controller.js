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
        let sum = this.dateProcessor.calcDateSum(dates)
        return this.dateProcessor.getTimeString(sum)
    }

    showTimeMean(dates) {
        let mean = this.dateProcessor.calcDateMean(dates)
        return this.dateProcessor.getTimeString(mean)
    }

    showCorrelationCoefficient() {
        let result = this.dateProcessor.calcCorrelationCoefficient(this.getInterruptions(), this.getDeltas())
        return result
    }

}

SummaryController.$inject = ['timeLogger', 'dateProcessor']
