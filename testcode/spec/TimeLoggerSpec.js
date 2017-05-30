/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */

describe('TimeLogger', () => {
    let timeLogger

    beforeEach(() => {
        timeLogger = new TimeLogger()
    })

    describe('generateId function', () => {
        it('generates a number 1 when called for the first time', () => {
            let id = timeLogger.generateId()
            expect(id).toBe(1)
        })

        it('generates a number 2 when called for the second time', () => {
            let id = timeLogger.generateId()
            id = timeLogger.generateId()
            expect(id).toBe(2)
        })
    })

    describe('addProject function', () => {
        it('stores given strings to this.projects', () => {
            let str = 'ProjectName'
            timeLogger.addProject(str)
            expect(timeLogger.projects.includes(str)).toBeTruthy()
        })

        it('does not store empty strings to this.projects', () => {
            let str = ''
            timeLogger.addProject(str)
            expect(timeLogger.projects.includes(str)).not.toBeTruthy()
        })

        it('trims white spaces before and after strings', () => {
            let str = '   Project   Name   '
            let strTrimmed = 'Project   Name'
            timeLogger.addProject(str)
            expect(timeLogger.projects.includes(str)).not.toBeTruthy()
            expect(timeLogger.projects.includes(strTrimmed)).toBeTruthy()
        })

        it('thus does not store strings with all white spaces', () => {
            let str = '   '
            timeLogger.addProject(str)
            expect(timeLogger.projects.includes(str)).not.toBeTruthy()
            expect(timeLogger.projects.includes('')).not.toBeTruthy()
        })
    })

    describe('addPhase function', () => {
        it('stores given strings to this.phases', () => {
            let str = 'PhaseName'
            timeLogger.addPhase(str)
            expect(timeLogger.phases.includes(str)).toBeTruthy()
        })

        it('does not store empty strings to this.phases', () => {
            let str = ''
            timeLogger.addPhase(str)
            expect(timeLogger.phases.includes(str)).not.toBeTruthy()
        })

        it('trims white spaces before and after strings', () => {
            let str = '   Phase   Name   '
            let strTrimmed = 'Phase   Name'
            timeLogger.addPhase(str)
            expect(timeLogger.phases.includes(str)).not.toBeTruthy()
            expect(timeLogger.phases.includes(strTrimmed)).toBeTruthy()
        })

        it('thus does not store strings with all white spaces', () => {
            let str = '   '
            timeLogger.addPhase(str)
            expect(timeLogger.phases.includes(str)).not.toBeTruthy()
            expect(timeLogger.phases.includes('')).not.toBeTruthy()
        })
    })

    describe('addTimeLog function', () => {
        let project, phase, start, stop, interruption, delta, comment

        beforeEach(() => {
            project = 'PR280'
            phase = 'Testing'
            start = new Date('2017-05-21T13:00Z')
            stop = new Date('2017-05-21T14:00Z')
            interruption = new Date('1970-01-01T00:00Z')
            delta = new Date('1970-01-01T01:00Z')
            comment = 'Unit test'
        })

        it('generates TimeLog and stores it to this.allMyTimeLogs', () => {
            timeLogger.addTimeLog(project, phase, start, stop, interruption, delta, comment)
            expect(timeLogger.allMyTimeLogs[0].myProject).toBe('PR280')
            expect(timeLogger.allMyTimeLogs[0].myPhase).toBe('Testing')
            expect(timeLogger.allMyTimeLogs[0].start).toEqual(start)
            expect(timeLogger.allMyTimeLogs[0].stop).toEqual(stop)
            expect(timeLogger.allMyTimeLogs[0].interruption).toEqual(interruption)
            expect(timeLogger.allMyTimeLogs[0].delta).toEqual(delta)
            expect(timeLogger.allMyTimeLogs[0].comment).toBe('Unit test')
        })

        it('generates id and set it to the TimeLog', () => {
            timeLogger.addTimeLog(project, phase, start, stop, interruption, delta, comment)
            expect(timeLogger.allMyTimeLogs[0].id).toBe(1)
        })
    })
})
