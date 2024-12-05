import './App.scss';
import React from 'react';
import {store, incrementSession, decrementSession, incrementBreak, decrementBreak, setTimerStarted,
  decrementTimer, resetTimer} from './State'
import { Provider, connect } from 'react-redux'

const BREAK_UP = 'bup';
const BREAK_DOWN = 'bdown';
const SESSION_UP = 'sup';
const SESSION_DOWN = 'sdown';
const START_STOP = 'start-stop';
const RESET = 'reset';

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: undefined,
    }
    this.onChange = this.onChange.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidUpdate() { 
    if(this.props.currentTimerMin === 0 && this.props.currentTimerSec === 0) {
      this.player.src = "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3";
      this.player.play();
    }
  }

  tick() {
    console.log("Tick");
    if(this.props.timerRunning) {
      this.props.secondTranspired();
    }
  }

  onChange(cmd){
    switch(cmd) {
      case BREAK_UP:
        this.props.incrementBreakLength();
        break;
      case BREAK_DOWN:
        this.props.decrementBreakLength();
        break;
      case SESSION_UP:
        this.props.incrementSessionLength();
        break;
      case SESSION_DOWN:
        this.props.decrementSessionLength();
        break;
      case START_STOP:
        console.log("In onChange:" + cmd);
        if(!this.props.timerRunning) {
          var newTimer = setInterval(this.tick, 1000);
          console.log("timer = " + newTimer);
          this.setState({timer: newTimer});
          this.props.setTimerStarted(true);
        } else {
          console.log("state timer = " + this.state.timer);
          clearInterval(this.state.timer);
          this.props.setTimerStarted(false);
          this.setState({timer: undefined});
        }
        break;
      case RESET:
        if(this.state.timer !== undefined) {
          clearInterval(this.state.timer);
          this.setState({timer: undefined});
        }
        this.props.reset();
        break;
      default:
        console.log("In onChange:" + cmd);
    }
  }
  render() {
    return (
      <div>
        <div class="center">
          <h1 class="center-content">Pomodoro Timer</h1>
          <div class="grid-two-columns">
            <audio id="beep" ref={ref=> this.player = ref} />
            <div class="center-content">
              <h2 id="break-label">Break Length</h2>
              <button id ="break-increment" disabled={this.props.timerRunning} onClick={ ()=>{this.onChange(BREAK_UP)} }>Up</button>
              <h2 id="break-length">{this.props.breakLength}</h2>
              <button id ="break-decrement" disabled={this.props.timerRunning} onClick={ ()=>{this.onChange(BREAK_DOWN)} }>Down</button>
            </div>
            <div class="center-content">
              <h2 id="session-label">Session Length</h2>
              <button id ="session-increment" disabled={this.props.timerRunning} onClick={ ()=>{this.onChange(SESSION_UP)} }>Up</button>
              <h2 id="session-length">{this.props.sessionLength}</h2>
              <button id ="session-decrement" disabled={this.props.timerRunning} onClick={ ()=>{this.onChange(SESSION_DOWN)} }>Down</button>
            </div>
          </div>
          <div class="center-content">
            <h2 id="timer-label">{this.props.currentMode}</h2>
            <h1 id="time-left">
              {String(this.props.currentTimerMin).padStart(2,0)}:{String(this.props.currentTimerSec).padStart(2,0)}
            </h1>
            <button id="start_stop" onClick={ ()=>{this.onChange(START_STOP)} }>Start/Stop</button>
            <button id="reset" onClick={ ()=>{this.onChange(RESET)} } >Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    sessionLength: state.sessionLength,
    breakLength: state.breakLength,
    currentMode: state.currentMode,
    timerRunning: state.timerRunning,
    currentTimerMin: state.currentTimerMin,
    currentTimerSec: state.currentTimerSec,
  }
};

const mapDispatchToProps = (dispatch)=>{ 
  return {
    incrementSessionLength: ()=>{ dispatch(incrementSession()) },
    decrementSessionLength: ()=>{ dispatch(decrementSession()) },
    incrementBreakLength: ()=>{ dispatch(incrementBreak()) },
    decrementBreakLength: ()=>{ dispatch(decrementBreak()) },
    setTimerStarted: (isStarted)=>{ dispatch(setTimerStarted(isStarted)) },
    secondTranspired: ()=>{ dispatch(decrementTimer()) },
    reset: ()=>{ dispatch(resetTimer()) },
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Pomodoro);

function App() {
  return (
    <Provider store={store}>
      <Container/>
    </Provider>
  );
}

export default App;
