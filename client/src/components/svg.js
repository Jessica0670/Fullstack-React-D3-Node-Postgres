import React from 'react';
import $ from 'jquery';
class SVG extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.click);
    this.state = {
      data: []
    };
  }

  componentDidMount(){
    // console.log(this.props.graphData,' DID MOUNT')
    // this.setState({data: this.props.graphData})
    // console.log(this.state.data, 'inside SVG function')
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

    // for(var i = 0; i < this.props.graphData; i++){
    //   this.state.data.push(this.props.graphData[i])
    // }
    // console.log(this.state.data, 'LKJHGBVF')
    return (
      <div>
        {svg}
<p>inside svg component</p>
<svg width={this.props.graphData[0]} height="50">
  <rect x="10" y="10" width="150" height="100"/>
</svg>
</div>
    )
  }
}
export default SVG;
