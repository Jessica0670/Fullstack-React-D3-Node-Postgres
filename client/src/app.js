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

  requestData(data){
    let term = data;
    console.log(term, 'inside app.js')
    $.ajax({
      type: "GET",
      url:'/id/'+data,
      success: (data) => {
        console.log('ajax success')
        this.state.graphData = []
        for(var i = 0; i < data.length; i++){
          if(data[i].message.indexOf(term) >= 0){
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
        <SVG click={this.requestData.bind(this) graphData={this.state.graphData}}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
