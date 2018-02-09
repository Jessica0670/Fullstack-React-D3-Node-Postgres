import React from 'react';
import $ from 'jquery';
class Search extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.click);
    this.state = {
      term: '',
      data: []
    };
  }

  onChange(e){
    //update state to term on change
    this.setState({term: e.target.value})

    // , () => {
    //             this.afterSetStateFinished();
    //         }


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

    let svg;
    if(this.props.graphData.length === 0) {
      svg = <div> ...LOADING</div>
    } else {
      svg = this.props.graphData.map((item) => {
        console.log(item, 'ITEMS')
       })
    }
    
    return (
      <div>
<input type="text" value={this.state.term} onChange={this.onChange.bind(this)} placeholder="search..."></input>

<button type="submit" onClick={this.buttonClick.bind(this)}>clickMe</button>


<svg width="50px" height={this.props.graphData[0]}>
  <rect x="10" y="10" width="150" height="400"/>
</svg>
</div>
    )
  }
}
export default Search;
