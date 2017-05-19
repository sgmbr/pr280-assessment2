/* jshint undef: true, unused: true, esversion: 6, asi: true */

class Project {
    constructor(newId, newName) {
        this.id = newId
        this.name = newName
        this.allMyPhases = []
        this.idCounter = 0
    }

    generateId() {
        this.idCounter += 1
        return this.idCounter
    }

    addPhase(newPhaseName) {
        let newId = this.generateId()
        let newPhase = new Project(newId, newPhaseName)
        this.allMyPhases.push(newPhase)
    }
}
