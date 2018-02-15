import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search.js';
import Chart from './components/bar.js';

import Moment from 'react-moment';
import 'moment-timezone';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        id: 1,
        name: 'Facebook!'
      },
      graphData: [],
      view: true,
    }
  }

  filterTime(string) {
  let arr = string.split("").reverse();
  let cut = arr.indexOf(":") -2
  let x = []
  let piece = arr.slice(cut).reverse()
  let cut1 = arr.indexOf(":") - 1
  let piece1 = piece.slice(cut1).join("")
  let array = piece1.split(":")

  array[1] = 5 * Math.round( array[1] / 5 );

  return array.join(":")
}

  requestData(term, view){
    this.state.graphData = []
    $.ajax({
      type: "GET",
      url:'/id/'+term,
      success: (data) => {
        console.log('ajax success') //data = array of messages, times and scores
        for(var i = 0; i < data.length; i++){
          //FILTER TIME HERE? or helper function
          const dateToFormat = new Date(data[i].time)
          dateToFormat.toString()
          // console.log(dateToFormat, 'DATE') //array of date strings
          //FILTERING TIME TO 5 MIN
          let filterTime = (dateToFormat) => {
          dateToFormat = dateToFormat.toString()
          let arr = dateToFormat.split("").reverse();
          let cut = arr.indexOf(":") -2
          let x = []
          let piece = arr.slice(cut).reverse()
          let cut1 = arr.indexOf(":") - 1
          let piece1 = piece.slice(cut1).join("")
          let array = piece1.split(":")

          array[1] = 5 * Math.round( array[1] / 5 );

          return array.join(":")
          }

          console.log(filterTime(dateToFormat), 'DATA')
          //need to split array and check if each word matches the term instead
          //allow # symbol when searching?
          //join # with closest word to the right when splitting
          if(data[i].message.indexOf(term) >= 0){
            this.state.graphData.push(data[i].score)
          }
        }
        this.setState({view:view})
      },
      error: (err) => {
        console.log('fail ajax', err)
      }
    })
  }

  renderView() {
    if (this.state.view === true) {
      return <Search click={this.requestData.bind(this)} view={() => this.changeView(true)} graphData={this.state.graphData}/>

    } else {
      return (
        <div>
        <Search click={this.requestData.bind(this)} view={() => this.changeView(true)} graphData={this.state.graphData}/>
        <Chart data={this.state.graphData} graphLoader={this.graphLoader.bind(this)}/>
      </div>
      )
    }
  }

//create function to load data to y value in barData
  graphLoader(graphDataArray){
    let barData = []
    let final = {};
      if(graphDataArray.length < 1){
        return 'empty data line 30 barjs'
      }
      final.name = "Series A"
      final.values = []
      let count = 1
      graphDataArray.forEach(item => {
        let a = {}
        a.x = count++;
        a.y = item
        final.values.push(a)
      })
      barData.push(final)
      return barData
  }

  render () {
    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
