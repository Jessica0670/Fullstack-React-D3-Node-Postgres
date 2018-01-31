import React from 'react';
import ReactDOM from 'react-dom';

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

  getCompany(){
    $.ajax({
      type: "GET",
      url:'',
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
      <h3>{this.state.company.name}</h3>
    </div>
  )
}

}


ReactDOM.render(<App />, document.getElementById('root'));
