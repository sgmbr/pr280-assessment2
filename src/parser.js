/* jshint undef: true, unused: true, esversion: 6, asi: true */

class Parser {
    constructor() {
        this.parsed = []
    }

    parseCsv(csv, cb) {
        let lines = csv.split('\r\n')
        lines.splice(0, 1) // Delete header

        lines.forEach(line => {
            let columns = line.split(',')
            cb(columns)
        })
    }

    parseTimeLogCsv(csv) {
        this.parsed = []
        this.parseCsv(csv, columns => {
            if (columns.length == 7) {
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
            }
        })
        return this.parsed
    }
}
