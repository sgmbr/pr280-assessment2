/* jshint undef: true, unused: true, esversion: 6, asi: true */

class TimeLog {
    constructor(newId, theProject, thePhase, newStart, newStop, newInterruption, newDelta, newComment) {
        this.id = newId
        this.myProject = theProject
        this.myPhase = thePhase
        this.start = newStart // Date + Start
        this.stop = newStop
        this.interruption = newInterruption
        this.delta = newDelta
        this.comment = newComment
    }
}
