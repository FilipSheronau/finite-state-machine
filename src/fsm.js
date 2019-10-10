class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.fsm = config;
        this.activeState = this.fsm.initial;
        this.und = [];
        this.red = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.fsm.states[state]) {
            this.und.push(this.activeState);
            this.activeState = state;
            this.red = []
        }
        else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.fsm.states[this.activeState].transitions[event]) {
            this.changeState(this.fsm.states[this.activeState].transitions[event]);
            this.red = []
        } 
        else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.fsm.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = [];
        if (event) {
            for(let value in this.fsm.states) {
                if (this.fsm.states[value].transitions[event]) {
                    arr.push(value);
                }
            }
        }
        else {
            for(let value in this.fsm.states) {                
                arr.push(value);                
            }            
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.und.length > 0) {
            this.red.push(this.activeState);
            this.activeState = this.und[this.und.length-1];
            this.und.splice(this.und.length-1,1);
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.red.length > 0) {
            this.und.push(this.activeState);
            this.activeState = this.red[this.red.length-1];
            this.red.splice(this.red.length-1,1);
            return true;        }
        else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.und = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
