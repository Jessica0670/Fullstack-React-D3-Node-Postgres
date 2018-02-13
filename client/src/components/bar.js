import React from 'react';
import $ from 'jquery';
import * as d3 from "d3";
// import rd3 from 'react-d3';
import rd3 from 'rd3';
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      barData: [],
      finalDataStructure: []
    };
  }



  componentWillReceiveProps(){ //works!
    // this.setState({ data: this.props.data }) //does not work
    console.log(this.props.data, 'DATA IN COMPONENT barjs from props line 15')
    let mappedData = this.props.data.map(x => {
      return x * 10
    })
    console.log(mappedData, 'testing mapped data from prop bar js line 20')
    // run function to load data to y value in barData
    this.props.graphLoader(mappedData)
    // this.setState({finalDataStructure: this.props.graphLoader(mappedData)})
    this.state.finalDataStructure = this.props.graphLoader(mappedData)
    let barData = this.state.finalDataStructure
    console.log(this.state.finalDataStructure, '?????',barData)
  }

  // shouldComponentUpdate(){
  //   if(this.state.finalDataStructure.length > 0){
  //     let final = this.state.finalDataStructure
  //     console.log(final, "FINAL")
  //   }
  //
  // }
  //
  // //create function to load data to y value in barData
  //   graphLoader(graphDataArray){
  //     if(graphDataArray.length < 1){
  //       return 'empty data line 28 barjs'
  //     }
  //     barData.name = "Company"
  //     barData.values = []
  //     console.log(graphDataArray, 'graph data array l 32 barjs')
  //     let count = 1
  //     graphDataArray.forEach(item => {
  //       let a = {}
  //       a.x = count++;
  //       a.y = item
  //       barData.values.push(a)
  //     })
  //     return barData
  //   }


  render() {
    let barData = [];
    const LineChart = rd3.LineChart;

    var lineData = [
          {
            name: 'series1',
            values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
            strokeWidth: 3,
            strokeDashArray: "5,5",
          }
        ]
    return  (<div>
      <p>{this.props.finalDataStructure, 'this.props.data line 50 in bar component'}</p>
      <LineChart
        data={lineData}
        width={800}
        height={300}
        title="Line Chart"
        yAxisLabel="Score"
        xAxisLabel="Elapsed Time (5 minutes)"
        gridVertical={true}
        domain={{x: [,10], y: [-150, 150]}}
        gridVerticalStrokeDash={'1, 0'}
      />
  </div>)}
};

export default Chart;
