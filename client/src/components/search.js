import React from 'react';
import $ from 'jquery';
class Search extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.click);
    this.state = {
      term: '',
      data: [],
      view: false
    };
  }

  onChange(e){
    //update state to term on change
    this.setState({term: e.target.value})

    console.log(this.state.term, 'TERM')
  }

  buttonClick(){
    //onclick send state to app.js
    console.log(this.state.term, 'CLICK')
    this.setState({ view: !this.state.view})
    this.props.click(this.state.term, this.state.view)

console.log(this.state.view)
  }


  render() {

    // let svg;
    // if(this.props.graphData.length === 0) {
    //   svg = <div> ...LOADING</div>
    // } else {
    //   svg = this.props.graphData.map((item) => {
    //     console.log(item, 'ITEMS')
    //    })
    // }

    return (

      <div>
<input type="text" value={this.state.term} onChange={this.onChange.bind(this)} placeholder="search..."></input>

<button type="submit" onClick={this.buttonClick.bind(this)}>search</button>
</div>
    )
  }
}
export default Search;
