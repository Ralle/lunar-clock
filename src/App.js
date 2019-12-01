import React from 'react';
import './App.css';
import moment from 'moment';

class App extends React.Component {
  constructor()
  {
    super();
    this.state = this.getNextState();
  }

  componentDidMount() {
    this.timer = setInterval(this.checkSleep.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getNextState() {
    const morning = moment().hours(6).minutes(15);
    const evening = moment().hours(18).minutes(45);
    // const evening = moment().hours(10);
    const mustSleep = !moment().isBetween(morning, evening, '[]');
    const time = moment().format('HH:mm');
    return { mustSleep, time };
  }

  checkSleep() {
    this.setState(this.getNextState());
  }

  render() {
    return (
      <div className={"App " + (this.state.mustSleep ? 'sleep' : 'wake')}>
        {/* <div className="show"></div> */}
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
