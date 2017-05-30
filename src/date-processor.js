/* jshint undef: true, unused: true, esversion: 6, asi: true */

class DateProcessor {
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

    // helper function to be used
    zeroPadding(number) {
        return (number < 10) ? "0" + number : number
    }

    getHHMM(date) {
        let hh = this.zeroPadding(date.getHours())
        let mm = this.zeroPadding(date.getMinutes())
        return `${hh}:${mm}`
    }

    // This method is only for delta time because it's UTC time
    getUTCHHMM(date) {
        let hh = this.zeroPadding(date.getUTCHours())
        let mm = this.zeroPadding(date.getUTCMinutes())
        return `${hh}:${mm}`
    }
}
