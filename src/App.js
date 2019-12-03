import React from 'react';
import './App.css';
import { isAfter, format, isBefore } from 'date-fns';

class App extends React.Component {
  constructor()
  {
    super();
    this.state = this.getNextState();
    this.state.switch = false;
  }

  componentDidMount() {
    this.timer = setInterval(this.checkSleep.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getNextState() {
    const morning = new Date()
    morning.setSeconds(0)
    const testing = false;
    if (testing)
    {
      morning.setHours(9)
      morning.setMinutes(12)
    }
    else
    {
      morning.setHours(6)
      morning.setMinutes(15)
    }
    const evening = new Date()
    evening.setSeconds(0)
    if (testing)
    {
      evening.setHours(9)
      evening.setMinutes(12)
      evening.setSeconds(10)
    }
    else
    {
      evening.setHours(18)
      evening.setMinutes(45)
    }
    const now = new Date()
    const mustSleep = !(isAfter(now, morning) && isBefore(now, evening));
    const time = format(now, 'HH:mm');
    return { mustSleep, time };
  }

  switch()
  {
    this.setState({switch: !this.state.switch});
  }

  mustSleep()
  {
    return this.state.switch ? !this.state.mustSleep : this.state.mustSleep;
  }

  checkSleep() {
    console.log(JSON.stringify(this.state, null, 2));
    const nextState = this.getNextState();
    if (nextState.mustSleep !== this.state.mustSleep)
    {
      nextState.switch = false;
    }
    this.setState(nextState);
  }

  render() {
    return (
      <div className={"App " + (this.mustSleep() ? 'sleep' : 'wake')} onClick={this.switch.bind(this)}>
        <div className="bottom">
          <div className="time">
            {this.state.time}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
