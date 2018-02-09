import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search.js'
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
        console.log(this.state.graphData)
      },
      error: (err) => {
        console.log('fail ajax', err)
      }
    })
  }

  render () {
    return (
      <div>
        <Search click={this.requestData.bind(this)} graphData={this.state.graphData}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
