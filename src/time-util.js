/* jshint undef: true, unused: true, esversion: 6, asi: true */

class TimeUtil {
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
