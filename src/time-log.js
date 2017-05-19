/* jshint undef: true, unused: true, esversion: 6, asi: true */

class TimeLog {
    constructor(newId, theProject, thePhase, newDate, newStart, newStop, newInterruption, newComment) {
        this.id = newId
        this.myProject = theProject
        this.myPhase = thePhase
        this.date = newDate
        this.start = newStart
        this.stop = newStop
        this.interruption = newInterruption
        this.comment = newComment
    }
}
