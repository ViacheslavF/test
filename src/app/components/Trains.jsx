import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Train1 from './Train1.jsx';
import Train2 from './Train2.jsx';
import Train3 from './Train3.jsx';

class Trains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainsCollection: [],
    };
  }

  componentDidMount() {
    fetch('../../trains.json')
    .then(response => response.json())
    .then(data => this.setState({ trainsCollection: data.trains }))
    .catch(error => {
      alert('There has been a problem with API: ' + error.message);
    });
  }

  deleteClass() {
    $('#train1 .train1').removeClass('train1')
    $('#train2 .train2').removeClass('train2')
    $('#train3 .train3').removeClass('train3')
  }

  addingClass(i,j,k) {
    $('.station1').eq(i).addClass('train1');
    $('.station2').eq(j).addClass('train2');
    $('.station3').eq(k).addClass('train3');
  }

  startTrainMoving(i=0, j=0, k=0) {
    let people = this.props;
    let step1 = 1, step2 = 1, step3 = 1;
    let trainOne = this.state.trainsCollection.filter(item => item.id === 1)[0],
    trainTwo = this.state.trainsCollection.filter(item => item.id === 2)[0],
    trainThree = this.state.trainsCollection.filter(item => item.id === 3)[0]

    setInterval(() => {
      this.deleteClass();

      $('.collision').hide()

      this.addingClass(i,j,k);

      if (trainTwo.stations[j+step2] === trainOne.stations[i+step1]) {

        if (people.peopleInTrain2 > people.peopleInTrain1) {
          (trainThree.stations[k+step3] === trainOne.stations[i]) ? (i = i, k = k, j += step2) : (i = i, k +=step3, j +=step2)
        }
        else {
          (trainTwo.stations[k+step3] === trainThree.stations[j]) ? (i += step1, k = k, j = j) : (j = j, k +=step3, i +=step1)
        }
        $('.collision').show()
      }

      else if (trainTwo.stations[j+step2] === trainThree.stations[k+step3]) {

        if (people.peopleInTrain2 > people.peopleInTrain3) {
          (trainThree.stations[k] === trainOne.stations[i+step1]) ? (i = i, k = k, j += step2) : (i += step1, k = k, j +=step2)
        }

        else {
          (trainTwo.stations[j] === trainOne.stations[i+step1]) ? (i =i, k +=step3, j = j) : (j =j, k +=step3, i +=step1)
        }

        $('.collision').show()
      }


      else if (trainOne.stations[i+step1] === trainThree.stations[k+step3]) {
        if (people.peopleInTrain1 > people.peopleInTrain3) {

          (trainThree.stations[k] === trainTwo.stations[j+step2]) ? (i += step1, k = k, j = j) : (i += step1, k = k, j +=step2)
        }
        else {
          (trainOne.stations[i] === trainTwo.stations[j+step2]) ? (i =i, k +=step3, j = j) : (i =i, k +=step3, j +=step2)
        }

        $('.collision').show()
      }

      else {
        i += step1;
        k += step3;
        j +=step2;
      }

      if (trainOne.stations[i] === 'Portland' || trainOne.stations[i] === 'San Francisco') {
        step1 = -step1;
      }
      if (trainTwo.stations[j] === 'New York' || trainTwo.stations[j] === 'San Diego') {
        step2 = -step2;
      }
      if (trainThree.stations[k] === 'San Jose' || trainThree.stations[k] === 'Detroit') {
        step3 = -step3;
      }
    }, 700)
  }

  render() {
    if (this.props.start === 'on') {
      this.startTrainMoving()
    }
    return (
      <div id="trains">
        <Train1></Train1>
        <Train2></Train2>
        <Train3></Train3>
      </div>
    );
  }
}

export default Trains;
