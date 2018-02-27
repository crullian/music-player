import React, { Component } from 'react';
import moment from 'moment';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: null,
      done: false
    };
    this.timer = null;
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // componentDidMount is called by react when the component 
    // has been rendered on the page. We can set the interval here:
    this.setState({timeLeft: this.props.start})
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:
    clearInterval(this.timer);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.start !== this.props.start) {
      this.setState({timeLeft: newProps.start})
    } else {
      if (newProps.isCounting && this.state.done) {
        this.setState({done: false});
        this.timer = setInterval(this.tick, 1000);
      }
    }
  }

  tick() {
    // This function is called every 1000 ms. It updates the 
    // elapsed counter. Calling setState causes the component to be re-rendered
    if (this.state.timeLeft < 1000) {
      this.setState({timeLeft: this.props.start, done: true})
      clearInterval(this.timer);
      this.props.resetAudioPlayer()
      return;
    }
    if (this.props.isCounting && (this.state.timeLeft > 1000)) {
      this.setState({timeLeft: this.state.timeLeft - 1000});
    } 
  }

  render() {
    // console.log('TIMER STATE', this.state);
    return ( 
        <h3>{moment(this.state.timeLeft).format('mm:ss') || '--:--'}</h3>
    )
  }
}

export default Timer;