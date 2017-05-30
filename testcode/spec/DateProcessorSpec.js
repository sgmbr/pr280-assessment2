/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */

describe('DateProcessor', () => {
    let dateProcessor

    beforeEach(() => {
        dateProcessor = new DateProcessor()
    })

    describe('buildStartDate function', () => {
        let date, start

        beforeEach(() => {
            date = new Date('2017-05-30')
            start = new Date('1970-01-01T14:00')
            start.setSeconds(0)
            start.setMilliseconds(0)
        })

        it('returns Date instance', () => {
            let startDate = dateProcessor.buildStartDate(date, start)
            expect(startDate instanceof Date).toBeTruthy()
        })

        it('returns given date + given time', () => {
            let startDate = dateProcessor.buildStartDate(date, start)
            expect(startDate.toString()).toEqual('Tue May 30 2017 14:00:00 GMT+1200 (New Zealand Standard Time)')
        })
    })

    describe('convertInterruptionToDate function', () => {
        let interruption

        beforeEach(() => {
            interruption = '01:05'
        })

        it('returns Date instance', () => {
            let interruptionDate = dateProcessor.convertInterruptionToDate(interruption)
            expect(interruptionDate instanceof Date).toBeTruthy()
        })

        it('returns time distance from 1970/01/01 00:00 UTC', () => {
            let interruptionDate = dateProcessor.convertInterruptionToDate(interruption)
            expect(interruptionDate.toUTCString()).toEqual('Thu, 01 Jan 1970 01:05:00 GMT')
        })
    })

    describe('getDeltaTime function', () => {
        let start, stop, interruption

        beforeEach(() => {
            start = new Date('2017-05-21T13:00Z')
            stop = new Date('2017-05-21T14:00Z') // 1 hour distance
            interruption = new Date('1970-01-01T00:00Z') // no interruption
        })

        it('returns Date instance', () => {
            let delta = dateProcessor.getDeltaTime(start, stop, interruption)
            expect(delta instanceof Date).toBeTruthy()
        })

        it('returns 1 hour when given 1 hour distance', () => {
            let delta = dateProcessor.getDeltaTime(start, stop, interruption)
            expect(delta.toUTCString()).toBe('Thu, 01 Jan 1970 01:00:00 GMT')
        })

        it('returns 55 min when given 1 hour distance and 5 min interruption', () => {
            interruption = new Date('1970-01-01T00:05Z') // 5 min interruption
            let delta = dateProcessor.getDeltaTime(start, stop, interruption)
            expect(delta.toUTCString()).toBe('Thu, 01 Jan 1970 00:55:00 GMT')
        })
    })

    describe('getCurrentTime function', () => {
        it('returns Date instance', () => {
            let current = dateProcessor.getCurrentTime()
            expect(current instanceof Date).toBeTruthy()
        })

        it('returns time with seconds and milliseconds set to 0', () => {
            let current = dateProcessor.getCurrentTime()
            expect(current.getSeconds()).toEqual(0)
            expect(current.getMilliseconds()).toEqual(0)
        })
    })

    describe('getHHMM function', () => {
        it('returns String', () => {
            let date = new Date()
            let hhmm = dateProcessor.getHHMM(date)
            expect(typeof hhmm).toEqual('string')
        })

        it('returns time of current locale', () => {
            let date = new Date(2017, 4, 30, 10, 05)
            let hhmm = dateProcessor.getHHMM(date)
            expect(hhmm).toEqual('10:05')
        })
    })

    describe('getUTCHHMM function', () => {
        it('returns String', () => {
            let date = new Date()
            let hhmm = dateProcessor.getUTCHHMM(date)
            expect(typeof hhmm).toEqual('string')
        })

        it('returns UTC time', () => {
            let date = new Date(2017, 4, 30, 20, 05)
            let hhmm = dateProcessor.getUTCHHMM(date)
            expect(hhmm).toEqual('08:05')
        })
    })
})
