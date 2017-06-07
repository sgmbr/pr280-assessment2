/* jshint undef: true, unused: true, esversion: 6, asi: true */

class DateProcessor {
    constructor() {}

    // combineDateStart
    buildStartDate(theDate, theStart) {
        let year = theDate.getFullYear()
        let month = theDate.getMonth()
        let date = theDate.getDate()
        let hours = theStart.getHours()
        let minutes = theStart.getMinutes()

        let start = new Date(year, month, date, hours, minutes)
        return start
    }

    // timeStringToDate
    convertInterruptionToDate(interruption) {
        let match = interruption.match(/^(\d{2})\:(\d{2})$/)
        let hours, minutes, time

        if (match) {
            hours = Number(match[1]) * 1000 * 60 * 60
            minutes = Number(match[2]) * 1000 * 60
            time = hours + minutes
        } else {
            time = 0
        }

        return new Date(time)
    }

    // calcDeltaTime
    getDeltaTime(start, stop, interruption) {
        let delta = new Date(stop - start - interruption)
        return delta
    }

    getCurrentTime() {
        let now = new Date()
        // format time to fit input[time]
        now.setSeconds(0)
        now.setMilliseconds(0)
        return now
    }

    zeroPadding(number) {
        return (number < 10) ? "0" + number : number
    }

    // dateToString? getTimeString?
    showTime(time) {
        let hours, minutes

        if (typeof time === 'number' && time > 0) {
            hours = Math.floor(time / 1000 / 60 / 60) % 60
            minutes = Math.floor(time / 1000 / 60) % 60
        } else {
            hours = minutes = 0
        }

        minutes = this.zeroPadding(minutes)

        return `${hours}:${minutes}`
    }

    // calcDateSum
    getDateSum(dates) {
        let sum = dates.reduce((acc, cur) => acc + cur.getTime(), 0)
        return sum
    }

    // calcDateMean
    getDateMean(dates) {
        let mean = 0
        if (dates.length > 0) {
            mean = this.getDateSum(dates) / dates.length
        }
        return mean
    }

    // calcDeviation
    getDeviations(dates) {
        let mean = this.getDateMean(dates)
        let deviations = dates.map(date => date.getTime() - mean)
        return deviations
    }

    // calcCorrelationCoefficient
    // datesX, datesY
    getCorrelationCoefficient(x, y) {
        function getProduct(xDeviations, yDeviations) {
            let product = 0
            for (let i = 0; i < xDeviations.length; i++) {
                product += xDeviations[i] * yDeviations[i]
            }
            return product
        }

        function getDeviationsSquaredSum(deviations) {
            let squared = deviations.map(deviation => deviation * deviation)
            let sum = squared.reduce((acc, cur) => acc + cur, 0)
            return sum
        }

        let xDeviations = this.getDeviations(x)
        let yDeviations = this.getDeviations(y)

        let product = getProduct(xDeviations, yDeviations)
        let xDeviationsSquaredSum = getDeviationsSquaredSum(xDeviations)
        let yDeviationsSquaredSum = getDeviationsSquaredSum(yDeviations)

        let correlationCoefficient = product / Math.sqrt(xDeviationsSquaredSum * yDeviationsSquaredSum)

        return correlationCoefficient
    }

}
