/* jshint undef: true, unused: true, esversion: 6, asi: true, browser: true, jquery: true */

describe('TimeLog', () => {
    let theTimeLog

    beforeEach(() => {
        let newId = 0
        let theProject = 'PR280'
        let thePhase = 'Testing'
        let now = new Date()
        now.setSeconds(0)
        now.setMilliseconds(0)
        let newStart = now
        let newStop = now
        let newInterruption = new Date('1970-01-01T00:00Z')
        let newDelta = new Date('1970-01-01T00:00Z')
        let newComment = 'Testing TimeLog class'

        theTimeLog = new TimeLog(newId, theProject, thePhase, newStart, newStop, newInterruption, newDelta, newComment)
    })

    it('has following properties: id, myProject, myPhase', () => {
        expect(theTimeLog.hasOwnProperty('id')).toBeTruthy()
        expect(theTimeLog.hasOwnProperty('myProject')).toBeTruthy()
        expect(theTimeLog.hasOwnProperty('myPhase')).toBeTruthy()
    })

    it('has following properties: start, stop', () => {
        expect(theTimeLog.hasOwnProperty('start')).toBeTruthy()
        expect(theTimeLog.hasOwnProperty('stop')).toBeTruthy()
    })

    it('has following properties: interruption, delta, comment', () => {
        expect(theTimeLog.hasOwnProperty('interruption')).toBeTruthy()
        expect(theTimeLog.hasOwnProperty('delta')).toBeTruthy()
        expect(theTimeLog.hasOwnProperty('comment')).toBeTruthy()
    })

})
