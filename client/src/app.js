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
    console.log(data, 'inside app.js')
    $.ajax({
      type: "GET",
      url:'/'+data,
      success: (data) => {
        console.log('ajax success', data)
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
