/* jshint undef: true, unused: true, esversion: 6, asi: true */

class Parser {
    constructor() {
        this.parsed = []
    }

    parseCsv(csv, callback) {
        let lines = csv.split('\r\n')
        lines.splice(0, 1) // Delete header

        lines.forEach(line => {
            if(line.trim() !== '') {
                let columns = line.split(',')
                callback(columns)
            }
        })
    }

    isValidDate(str) {
        let date = new Date(str)
        return date.toString() !== 'Invalid Date' ? true : false
    }

    isValidTime(str) {
        let date = new Date(`1970-01-01T${str}:00`)
        return date.toString() !== 'Invalid Date' ? true : false
    }

    parseTimeLogCsv(csv) {
        this.parsed = []
        this.parseCsv(csv, columns => {
            if (columns.length === 7 &&
                this.isValidDate(columns[2]) &&
                this.isValidTime(columns[3]) &&
                this.isValidTime(columns[4]) &&
                this.isValidTime(columns[5]) ) {

                let timeLog = {
                    project: columns[0],
                    phase: columns[1],
                    date: columns[2],
                    start: columns[3],
                    stop: columns[4],
                    interruption: columns[5],
                    comment: columns[6]
                }
                this.parsed.push(timeLog)
            } else {
                throw new Error('Invalid input')
            }
        })
        return this.parsed
    }

}
