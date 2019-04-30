import React from 'react';
import './App.css';
import moment from 'moment';

class App extends React.Component {
  constructor()
  {
    super();
    this.checkSleep(42);
  }

  componentDidMount() {
    this.timer = setInterval(this.checkSleep.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  checkSleep(isFirst = 43) {
    const morning = moment().hours(6).minutes(15);
    const evening = moment().hours(18);
    const mustSleep = !moment().isBetween(morning, evening, '[]');
    const time = moment().format('HH:mm');
    const state = { mustSleep, time };
    if (isFirst === 42) {
      this.state = state;
    }
    else
    {
      this.setState(state);
    }
  }

  render() {
    return (
      <div className="App">
          <div className="show">
            {this.state.mustSleep ? 'SLEEP' : 'WAKE UP'}
          </div>
          <div className="time">
            {this.state.time}
          </div>
      </div>
    );
  }
}

export default App;
