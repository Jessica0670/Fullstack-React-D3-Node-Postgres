import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search.js';
import Chart from './components/bar.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        id: 1,
        name: 'Facebook!'
      },
      graphData: [],
      view: true
    }
  }

  requestData(term, view){
    this.state.graphData = []
//term works ==> input data
    $.ajax({
      type: "GET",
      url:'/id/'+term,
      success: (data) => {
        console.log('ajax success') //data = array of message and scores
        for(var i = 0; i < data.length; i++){
          //need to split array and check if each word matches the term instead
          //allow # symbol when searching
          //join # with closest word to the right when splitting
          if(data[i].message.indexOf(term) >= 0){
            console.log(data[i])
            this.state.graphData.push(data[i].score)
          }
        }
        this.setState({view:view})
        console.log(this.state.graphData, "GRAPH DATA LINE 35 app.js")
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
      <Chart data={this.state.graphData}/>
    </div>
    )

  }
}

  render () {
    // <React.Fragment>

    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
