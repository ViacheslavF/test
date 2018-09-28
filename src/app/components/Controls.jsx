import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Trains from './Trains.jsx';

import '../css/Controls.less'

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleNumberOfTrain1: '',
      peopleNumberOfTrain2: '',
      peopleNumberOfTrain3: '',
      start: 'off'
    };
    this.train1 = React.createRef();
    this.train2 = React.createRef();
    this.train3 = React.createRef();
  }
  start() {
    this.setState({
      peopleNumberOfTrain1: this.train1.current.value,
      peopleNumberOfTrain2: this.train2.current.value,
      peopleNumberOfTrain3: this.train3.current.value,
      start: 'on'
    })
  }
  render() {
    return (
      <div className='main'>
        <div className="collision">Danger of collision</div>
        <div id="controls">
          <p>Number of people in trains</p>

          <div id="control-panel">
            <label className='for-train-1' htmlFor="input-train1">Train 1</label>
            <input ref={this.train1} className="input-train1" type="number" min='0' name="person" defaultValue='1' />

            <label className='for-train-2' htmlFor="input-train2">Train 2</label>
            <input ref={this.train2} className="input-train2" type="number" min='0' name="person" defaultValue='2' />

            <label className='for-train-3' htmlFor="input-train3">Train 3</label>
            <input ref={this.train3} className="input-train3" type="number" min='0' name="person" defaultValue='3' />

            <button type="button" name="button" id="start" onClick={this.start.bind(this)}>Start</button>
          </div>
        </div>
        <Trains
          peopleInTrain1={this.state.peopleNumberOfTrain1}
          peopleInTrain2={this.state.peopleNumberOfTrain2}
          peopleInTrain3={this.state.peopleNumberOfTrain3}
          start={this.state.start}
          >
        </Trains>
      </div>
    );
  }
}

export default Controls;
