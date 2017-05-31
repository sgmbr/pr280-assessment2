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

    getDateSum(dates) {
        let sum = dates.reduce((acc, cur) => acc + cur.getTime(), 0)
        return new Date(sum)
    }

    getDateMean(dates) {
        let mean = 0
        let sum = this.getDateSum(dates)
        let count = dates.length
        if (count > 0) {
            mean = Math.round(sum.getTime() / count)
        }
        return new Date(mean)
    }

    getDeviations(dates) {
        let mean = this.getDateMean(dates)
        let deviations = dates.map(date => date.getTime() - mean.getTime())
        return deviations
    }

    getDeviationsSquared(dates) {
        let deviations = this.getDeviations(dates)
        let deviationsSquared = deviations.map(deviation => deviation * deviation)
        return deviationsSquared
    }

    getCorrelationCoefficient(x, y) {
        let xDeviations = this.getDeviations(x)
        let yDeviations = this.getDeviations(y)
        console.log(xDeviations, yDeviations);
        console.log(xDeviations[0] * yDeviations[0]);

        let product = 0
        for (let i = 0; i < x.length; i++) {
            product += xDeviations[i] * yDeviations[i]
        }
        console.log(product);

        let xDeviationsSquared = this.getDeviationsSquared(x)
        let xDeviationsSquaredSum = xDeviationsSquared.reduce((acc, cur) => acc + cur, 0)
        let yDeviationsSquared = this.getDeviationsSquared(y)
        let yDeviationsSquaredSum = yDeviationsSquared.reduce((acc, cur) => acc + cur, 0)

        let correlationCoefficient = product / Math.sqrt(xDeviationsSquaredSum * yDeviationsSquaredSum)

        return correlationCoefficient
    }

}

MainController.$inject = ['timeLogger', 'dateProcessor']
