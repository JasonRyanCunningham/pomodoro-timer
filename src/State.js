import { legacy_createStore as createStore } from 'redux'
// enum
const TimerMode = {
    session: "Session",
    break: "Break",
}

//actions
const INCREMENT_SESSION = 'INCREMENT_SESSION';
const DECREMENT_SESSION = 'DECREMENT_SESSION';
const INCREMENT_BREAK = 'INCREMENT_BREAK';
const DECREMENT_BREAK = 'DECREMENT_BREAK';
const TIMER_START = 'TIMER_START';
const DECREMENT_TIMER = 'DECREMENT_TIMER';
const RESET_TIMER = 'RESET_TIMER';

// action creators
const incrementSession = ()=>{
    return {type: INCREMENT_SESSION};
}
const decrementSession = ()=>{
    return {type: DECREMENT_SESSION};
}
const incrementBreak = ()=>{
    return {type: INCREMENT_BREAK};
}
const decrementBreak = ()=>{
    return {type: DECREMENT_BREAK};
}
const setTimerStarted = (started)=>{
    return {
        type: TIMER_START,
        isStarted: started 
    };
}
const decrementTimer = ()=>{
    return {type: DECREMENT_TIMER};
}
const resetTimer = ()=>{
    return {type: RESET_TIMER}; 
}

const defaultState = {
    sessionLength: 25, // [60-0]
    breakLength: 5, // [60-0]
    currentMode: TimerMode.session,
    timerRunning: false,
    currentTimerMin: 25, // [60-0]
    currentTimerSec: 0, // [60-0]
}

const reducer = (state = defaultState, action)=>{
    switch(action.type) {
        case INCREMENT_SESSION:
            var newSessionValue = state.sessionLength;
            if(newSessionValue < 60) {
                newSessionValue = newSessionValue + 1;
            }
            return {
                sessionLength: newSessionValue,
                breakLength: state.breakLength,
                currentMode: state.currentMode,
                timerRunning: state.timerRunning,
                currentTimerMin: newSessionValue,
                currentTimerSec: state.currentTimerSec,
            }
        case DECREMENT_SESSION:
            var newSessionValue = state.sessionLength;
            if(newSessionValue > 1) {
                newSessionValue = newSessionValue - 1;
            }
            return {
                sessionLength: newSessionValue,
                breakLength: state.breakLength,
                currentMode: state.currentMode,
                timerRunning: state.timerRunning,
                currentTimerMin: newSessionValue,
                currentTimerSec: state.currentTimerSec,
            }
        case INCREMENT_BREAK:
            var newBreakValue = state.breakLength;
            if(newBreakValue < 60) {
                newBreakValue = newBreakValue + 1;
            }
            return {
                sessionLength: state.sessionLength,
                breakLength: newBreakValue,
                currentMode: state.currentMode,
                timerRunning: state.timerRunning,
                currentTimerMin: state.currentTimerMin,
                currentTimerSec: state.currentTimerSec,
            }
        case DECREMENT_BREAK:
            var newBreakValue = state.breakLength;
            if(newBreakValue > 1) {
                newBreakValue = newBreakValue - 1;
            }
            return {
                sessionLength: state.sessionLength,
                breakLength: newBreakValue,
                currentMode: state.currentMode,
                timerRunning: state.timerRunning,
                currentTimerMin: state.currentTimerMin,
                currentTimerSec: state.currentTimerSec,
            }
        case TIMER_START:
                console.log("TIMER_START:" + action.isStarted);
            return {
                sessionLength: state.sessionLength,
                breakLength: state.breakLength,
                currentMode: state.currentMode,
                timerRunning: action.isStarted,
                currentTimerMin: state.currentTimerMin,
                currentTimerSec: state.currentTimerSec,
            }
        case DECREMENT_TIMER:
            var newMinutes = state.currentTimerMin;
            var newSeconds = state.currentTimerSec;
            var newMode = state.currentMode;
            if(state.timerRunning === true) {
                /* Decrement from seconds, borrow from Minutes if needed. 
                If both 0 reset to the other mode. */
                if(newSeconds > 0) {
                    newSeconds = newSeconds - 1;
                } else if (newMinutes > 0) {
                    newMinutes = newMinutes - 1;
                    newSeconds = 59;
                } else {
                    if(newMode === TimerMode.session) {
                        newMode = TimerMode.break;
                        newMinutes = state.breakLength;
                    } else {
                        newMode = TimerMode.session;
                        newMinutes = state.sessionLength;
                    }
                }
            }
            return {
                sessionLength: state.sessionLength,
                breakLength: state.breakLength,
                currentMode: newMode,
                timerRunning: state.timerRunning,
                currentTimerMin: newMinutes,
                currentTimerSec: newSeconds,
            }
        case RESET_TIMER:
            return defaultState;
        default:
            return state;
    }
}

const store = createStore(reducer);

export {store, incrementSession, decrementSession, incrementBreak, decrementBreak, setTimerStarted,
    decrementTimer, resetTimer, TimerMode};
