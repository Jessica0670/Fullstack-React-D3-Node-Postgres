import React from 'react';
import $ from 'jquery';
class SVG extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.click);
    this.state = {
      term: ''
    };
  }

  onChange(e){
    this.setState({term: e.target.value})
    // console.log(this.state.term)
    this.props.click(this.state.term)

    //run fuction bound to app here as this.state.term as the param
  }

  click(){
    // this.props.click(this.state.term)
    // this.onChange()
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

<button type="submit" onClick={this.props.click}>clickMe</button>
<h1 onClick={() => this.props.click()}>click me</h1>
</div>
    )
  }
}
export default SVG;
