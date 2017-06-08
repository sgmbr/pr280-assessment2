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

    describe('timeStringToDate function', () => {
        let interruption

        beforeEach(() => {
            interruption = '01:05'
        })

        it('returns Date instance', () => {
            let interruptionDate = dateProcessor.timeStringToDate(interruption)
            expect(interruptionDate instanceof Date).toBeTruthy()
        })

        it('returns time distance from 1970/01/01 00:00 UTC', () => {
            let interruptionDate = dateProcessor.timeStringToDate(interruption)
            expect(interruptionDate.toUTCString()).toEqual('Thu, 01 Jan 1970 01:05:00 GMT')
        })

        it('returns a date of 00:00 if parameter is invalid', () => {
            interruption = 'test'
            let interruptionDate = dateProcessor.timeStringToDate(interruption)
            expect(interruptionDate.toUTCString()).toEqual('Thu, 01 Jan 1970 00:00:00 GMT')
        })
    })

    describe('calcDeltaTime function', () => {
        let start, stop, interruption

        beforeEach(() => {
            start = new Date('2017-05-21T13:00Z')
            stop = new Date('2017-05-21T14:00Z') // 1 hour distance
            interruption = new Date('1970-01-01T00:00Z') // no interruption
        })

        it('returns Date instance', () => {
            let delta = dateProcessor.calcDeltaTime(start, stop, interruption)
            expect(delta instanceof Date).toBeTruthy()
        })

        it('returns 1 hour when given 1 hour distance', () => {
            let delta = dateProcessor.calcDeltaTime(start, stop, interruption)
            expect(delta.toUTCString()).toBe('Thu, 01 Jan 1970 01:00:00 GMT')
        })

        it('returns 55 min when given 1 hour distance and 5 min interruption', () => {
            interruption = new Date('1970-01-01T00:05Z') // 5 min interruption
            let delta = dateProcessor.calcDeltaTime(start, stop, interruption)
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

    describe('zeroPadding function', () => {
        it('returns "01" when passed 1', () => {
            let number = 1
            expect(dateProcessor.zeroPadding(number)).toEqual('01')
        })

        it('returns 99 when passed 99', () => {
            let number = 99
            expect(dateProcessor.zeroPadding(number)).toEqual(99)
        })

        it('returns 100 when passed 100', () => {
            let number = 100
            expect(dateProcessor.zeroPadding(number)).toEqual(100)
        })

        it('returns "a" when passed "a"', () => {
            let number = 'a'
            expect(dateProcessor.zeroPadding(number)).toEqual('a')
        })
    })

    describe('getTimeString function', () => {
        it('returns "1:05" when passed 3900000', () => {
            let time = 3900000
            expect(dateProcessor.getTimeString(time)).toEqual("1:05")
        })

        it('returns "30:00" when passed 108000000 (>24h)', () => {
            let time = 108000000
            expect(dateProcessor.getTimeString(time)).toEqual("30:00")
        })

        it('returns "0:00" when passed -3900000 (negative number)', () => {
            let time = -3900000
            expect(dateProcessor.getTimeString(time)).toEqual("0:00")
        })

        it('returns "0:00" when passed "aaa" (not a number)', () => {
            let time = 'aaa'
            expect(dateProcessor.getTimeString(time)).toEqual("0:00")
        })
    })

    describe('calcDateSum function', () => {
        it('returns 1800000 (30min) when passed [5min, 10min, 15min]', () => {
            let dateA = new Date(300000)
            let dateB = new Date(600000)
            let dateC = new Date(900000)
            let dates = [dateA, dateB, dateC]
            expect(dateProcessor.calcDateSum(dates)).toEqual(1800000)
        })
    })

    describe('calcDateMean function', () => {
        it('returns 600000 (10min) when passed [5min, 10min, 15min]', () => {
            let dateA = new Date(300000)
            let dateB = new Date(600000)
            let dateC = new Date(900000)
            let dates = [dateA, dateB, dateC]
            expect(dateProcessor.calcDateMean(dates)).toEqual(600000)
        })
    })

    describe('calcDeviation function', () => {
        it('returns [-300000, 0, 300000] when passed [5min, 10min, 15min]', () => {
            let dateA = new Date(300000)
            let dateB = new Date(600000)
            let dateC = new Date(900000)
            let dates = [dateA, dateB, dateC]
            let deviations = dateProcessor.calcDeviation(dates)
            expect(deviations[0]).toEqual(-300000)
            expect(deviations[1]).toEqual(0)
            expect(deviations[2]).toEqual(300000)
        })
    })

    describe('calcCorrelationCoefficient function', () => {
        it('returns 1 when passed x:[5min, 10min, 15min] y:[5min, 10min, 15min]', () => {
            let dateA = new Date(300000)
            let dateB = new Date(600000)
            let dateC = new Date(900000)
            let datesX = [dateA, dateB, dateC]
            let datesY = [dateA, dateB, dateC]

            let result = dateProcessor.calcCorrelationCoefficient(datesX, datesY)
            expect(result).toEqual(1)
        })

        it('returns -1 when passed x:[5min, 10min, 15min] y:[15min, 10min, 5min]', () => {
            let dateA = new Date(300000)
            let dateB = new Date(600000)
            let dateC = new Date(900000)
            let datesX = [dateA, dateB, dateC]
            let datesY = [dateC, dateB, dateA]

            let result = dateProcessor.calcCorrelationCoefficient(datesX, datesY)
            expect(result).toEqual(-1)
        })

        it('returns a number between 0 to 1 when passed x:[5min, 10min, 15min] y:[10min, 10min, 15min]', () => {
            let dateA = new Date(300000)
            let dateB = new Date(600000)
            let dateC = new Date(900000)
            let datesX = [dateA, dateB, dateC]
            let datesY = [dateB, dateB, dateC]

            let result = dateProcessor.calcCorrelationCoefficient(datesX, datesY)
            expect(result).toBeGreaterThan(0)
            expect(result).toBeLessThan(1)
        })

        it('returns a number between -1 to 0 when passed x:[5min, 10min, 15min] y:[10min, 10min, 5min]', () => {
            let dateA = new Date(300000)
            let dateB = new Date(600000)
            let dateC = new Date(900000)
            let datesX = [dateA, dateB, dateC]
            let datesY = [dateB, dateB, dateA]

            let result = dateProcessor.calcCorrelationCoefficient(datesX, datesY)
            expect(result).toBeGreaterThan(-1)
            expect(result).toBeLessThan(0)
        })
    })

})
