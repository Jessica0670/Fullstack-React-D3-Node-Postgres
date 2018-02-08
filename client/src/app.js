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
      }
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
        let results = []
        for(var i = 0; i < data.length; i++){
          // console.log(data[i].score)
          if(data[i].message.indexOf(term) >= 0){
            results.push(data[i].score)
          }
        }
        console.log(results, 'results')
        //filter here?
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
        <SVG click={this.requestData.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
