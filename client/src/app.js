import React from 'react';
import ReactDOM from 'react-dom';
import SVG from './components/svg.js'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        id: 1,
        name: 'Facebook!'
      },
      graphData: []
    }
  }

  requestData(term){
    this.state.graphData = []
console.log(term, 'DATA') //works ==> input data
    $.ajax({
      type: "GET",
      url:'/id/'+term,
      success: (data) => {
        console.log('ajax success') //data = array of message and scores
        // this.state.graphData = []
        for(var i = 0; i < data.length; i++){
          if(data[i].message.indexOf(term) >= 0){
            console.log(data[i].message)
            this.state.graphData.push(data[i].score)
          }
        }
        console.log(this.state.graphData, 'results')
        //filter here
        //use this data for d3
      },
      error: (err) => {
        console.log('fail ajax', err)
      }
    })
  }

  render () {
    return (
      <div>
        <SVG click={this.requestData.bind(this)} graphData={this.state.graphData}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
