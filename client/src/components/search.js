import React from 'react';
import $ from 'jquery';
class Search extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.click);
    this.state = {
      term: ''
    };
  }

  onChange(e){
    //update state
    this.setState({term: e.target.value})
    // console.log(this.state.term)
    console.log(this.state.term, 'TERM')
    // this.buttonClick(this.state.term)
    // this.props.click(this.state.term)

    //run fuction bound to app here as this.state.term as the param
  }

  buttonClick(){
    //onclick send state to app.js
    console.log(this.state.term, 'CLICK')

    this.props.click(this.state.term)

    // this.props.click(term)
    // console.log(term, 'term in component button click')
    // this.onChange(this.state.term)
  }

  render() {
    return (
      <div>
<p>inside svg component</p>

<svg width="50" height="50">
  <rect x="10" y="10" width="150" height="100"/>
</svg>
<p></p>

<input type="text" value={this.state.term} onChange={this.onChange.bind(this)} placeholder="search..."></input>

<button type="submit" onClick={this.buttonClick.bind(this)}>clickMe</button>
</div>
    )
  }
}
export default Search;
