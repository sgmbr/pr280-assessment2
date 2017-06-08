/* jshint undef: true, unused: true, esversion: 6, asi: true */

class DateProcessor {
    constructor() {}

    buildStartDate(theDate, theStart) {
        let year = theDate.getFullYear()
        let month = theDate.getMonth()
        let date = theDate.getDate()
        let hours = theStart.getHours()
        let minutes = theStart.getMinutes()

        let start = new Date(year, month, date, hours, minutes)
        return start
    }

    timeStringToDate(timeString) {
        let match = timeString.match(/^(\d{2})\:(\d{2})$/)
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

    calcDeltaTime(start, stop, interruption) {
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

    getTimeString(time) {
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

    calcDateSum(dates) {
        let sum = dates.reduce((acc, cur) => acc + cur.getTime(), 0)
        return sum
    }

    calcDateMean(dates) {
        let mean = 0
        if (dates.length > 0) {
            mean = this.calcDateSum(dates) / dates.length
        }
        return mean
    }

    calcDeviation(dates) {
        let mean = this.calcDateMean(dates)
        let deviations = dates.map(date => date.getTime() - mean)
        return deviations
    }

    calcCorrelationCoefficient(datesX, datesY) {
        function calcProduct(xDeviations, yDeviations) {
            let product = 0
            for (let i = 0; i < xDeviations.length; i++) {
                product += xDeviations[i] * yDeviations[i]
            }
            return product
        }

        function calcDeviationSquaredSum(deviations) {
            let squared = deviations.map(deviation => deviation * deviation)
            let sum = squared.reduce((acc, cur) => acc + cur, 0)
            return sum
        }

        let xDeviations = this.calcDeviation(datesX)
        let yDeviations = this.calcDeviation(datesY)

        let product = calcProduct(xDeviations, yDeviations)
        let xDeviationsSquaredSum = calcDeviationSquaredSum(xDeviations)
        let yDeviationsSquaredSum = calcDeviationSquaredSum(yDeviations)

        let correlationCoefficient = product / Math.sqrt(xDeviationsSquaredSum * yDeviationsSquaredSum)

        return correlationCoefficient
    }

}
