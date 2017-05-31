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

    convertInterruptionToDate(interruption) {
        // ISO Dates format. Z indicates UTC.
        // https://www.w3schools.com/js/js_date_formats.asp
        return new Date(`1970-01-01T${interruption}Z`)
    }

    getDeltaTime(start, stop, interruption) {
        let delta = new Date(stop - start - interruption)
        return delta
    }

    // format time to fit input[time]
    getCurrentTime() {
        let now = new Date()
        now.setSeconds(0)
        now.setMilliseconds(0)
        return now
    }

    zeroPadding(number) {
        return (number < 10) ? "0" + number : number
    }

    showTime(date) {
        let time = date.getTime()

        let minutes = Math.floor(time / 1000 / 60) % 60
        let hours = Math.floor(time / 1000 / 60 / 60) % 60

        minutes = this.zeroPadding(minutes)

        return `${hours}:${minutes}`
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
