/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */

describe('Parser', () => {
    let parser

    beforeEach(() => {
        parser = new Parser()
    })

    describe('parseCsv function', () => {
        let csv

        beforeEach(() => {
            csv = 'header1,header2,header3\r\ncontent4,content5,content6\r\ncontent7,content8,content9\r\n\r\n'
        })

        it('executes callback for each lines except first line (header) and empty lines', () => {
            let lineCount = 0
            let callback = () => {
                lineCount += 1
            }
            parser.parseCsv(csv, callback)
            expect(lineCount).toBe(2)
        })

        it('splits a line by commas and store columns into an array', () => {
            let lines = []
            let callback = (columns) => {
                lines.push(columns)
            }
            parser.parseCsv(csv, callback)
            expect(lines[0][0]).toBe('content4')
            expect(lines[0][1]).toBe('content5')
            expect(lines[0][2]).toBe('content6')
            expect(lines[1][0]).toBe('content7')
            expect(lines[1][1]).toBe('content8')
            expect(lines[1][2]).toBe('content9')
        })
    })

    describe('isValidDate function', () => {
        it('returns true when input 2017-06-08', () => {
            let date = '2017-06-08'
            let result = parser.isValidDate(date)

            expect(result).toBeTruthy()
        })

        it('returns true when input 2017-06-31', () => {
            let date = '2017-06-31'
            let result = parser.isValidDate(date)

            expect(result).toBeTruthy()
        })

        it('returns false when input 2017-06-32', () => {
            let date = '2017-06-32'
            let result = parser.isValidDate(date)

            expect(result).not.toBeTruthy()
        })
    })

    describe('isValidTime function', () => {
        it('returns true when input 00:00', () => {
            let time = '00:00'
            let result = parser.isValidTime(time)

            expect(result).toBeTruthy()
        })

        it('returns true when input 23:59', () => {
            let time = '23:59'
            let result = parser.isValidTime(time)

            expect(result).toBeTruthy()
        })

        it('returns true when input 24:00', () => {
            let time = '24:00'
            let result = parser.isValidTime(time)

            expect(result).toBeTruthy()
        })

        it('returns false when input 24:01', () => {
            let time = '24:01'
            let result = parser.isValidTime(time)

            expect(result).not.toBeTruthy()
        })
    })

    describe('parseTimeLogCsv function', () => {

        it('returns parsed data', () => {
            let csv = 'Project,Phase,Date,Start,Stop,Interrupt,Comment\r\nProjectA,Phase1,2017-06-07,13:00,15:00,00:10,listing all tasks\r\nProjectB,Phase2,2017-06-08,15:00,16:00,00:04,create a timetable\r\n'
            let result = parser.parseTimeLogCsv(csv)

            expect(result[0].project).toBe('ProjectA')
            expect(result[0].phase).toBe('Phase1')
            expect(result[0].date).toBe('2017-06-07')
            expect(result[0].start).toBe('13:00')
            expect(result[0].stop).toBe('15:00')
            expect(result[0].interruption).toBe('00:10')
            expect(result[0].comment).toBe('listing all tasks')

            expect(result[1].project).toBe('ProjectB')
            expect(result[1].phase).toBe('Phase2')
            expect(result[1].date).toBe('2017-06-08')
            expect(result[1].start).toBe('15:00')
            expect(result[1].stop).toBe('16:00')
            expect(result[1].interruption).toBe('00:04')
            expect(result[1].comment).toBe('create a timetable')
        })

        it('throws error when there is a line of 6 columns', () => {
            let csv = 'Project,Phase,Date,Start,Stop,Interrupt,Comment\r\nProjectA,Phase1,2017-06-07,13:00,15:00,00:10\r\nProjectB,Phase2,2017-06-08,15:00,16:00,00:04,create a timetable\r\n'
            let result
            try {
                result = parser.parseTimeLogCsv(csv)
            } catch (error) {
                expect(error.message).toBe('Invalid input')
            }
        })

        it('throws error when there is a line of 8 columns', () => {
            let csv = 'Project,Phase,Date,Start,Stop,Interrupt,Comment\r\nProjectA,Phase1,2017-06-07,13:00,15:00,00:10,listing all tasks\r\nProjectB,Phase2,2017-06-08,15:00,16:00,00:04,create a timetable,unwanted column\r\n'
            let result
            try {
                result = parser.parseTimeLogCsv(csv)
            } catch (error) {
                expect(error.message).toBe('Invalid input')
            }
        })

        it('throws error when there is an invalid date 2017-13-08', () => {
            let csv = 'Project,Phase,Date,Start,Stop,Interrupt,Comment\r\nProjectA,Phase1,2017-06-07,13:00,15:00,00:10,listing all tasks\r\nProjectB,Phase2,2017-13-08,15:00,16:00,00:04,create a timetable\r\n'
            let result
            try {
                result = parser.parseTimeLogCsv(csv)
            } catch (error) {
                expect(error.message).toBe('Invalid input')
            }
        })

        it('throws error when there is an invalid start 25:00', () => {
            let csv = 'Project,Phase,Date,Start,Stop,Interrupt,Comment\r\nProjectA,Phase1,2017-06-07,25:00,15:00,00:10,listing all tasks\r\nProjectB,Phase2,2017-06-08,15:00,16:00,00:04,create a timetable\r\n'
            let result
            try {
                result = parser.parseTimeLogCsv(csv)
            } catch (error) {
                expect(error.message).toBe('Invalid input')
            }
        })

        it('throws error when there is an invalid stop 25:00', () => {
            let csv = 'Project,Phase,Date,Start,Stop,Interrupt,Comment\r\nProjectA,Phase1,2017-06-07,10:00,25:00,00:10,listing all tasks\r\nProjectB,Phase2,2017-06-08,15:00,16:00,00:04,create a timetable\r\n'
            let result
            try {
                result = parser.parseTimeLogCsv(csv)
            } catch (error) {
                expect(error.message).toBe('Invalid input')
            }
        })

        it('throws error when there is an invalid interruption time fdsa', () => {
            let csv = 'Project,Phase,Date,Start,Stop,Interrupt,Comment\r\nProjectA,Phase1,2017-06-07,10:00,15:00,fdsa,listing all tasks\r\nProjectB,Phase2,2017-06-08,15:00,16:00,00:04,create a timetable\r\n'
            let result
            try {
                result = parser.parseTimeLogCsv(csv)
            } catch (error) {
                expect(error.message).toBe('Invalid input')
            }
        })

    })
})
