import React from 'react';
import $ from 'jquery';
import * as d3 from "d3";
// import rd3 from 'react-d3';
import rd3 from 'rd3';
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillReceiveProps(){ //works!
    this.setState({ data: this.props.data })
    console.log(this.props.data, 'DATA IN COMPONENT CHART line 15')
  }
  render() {


    // const BarChart = rd3.BarChart;
const LineChart = rd3.LineChart;
// const PieChart = rd3.PieChart;
// const AreaChart = rd3.AreaChart;
// const Treemap = rd3.Treemap;
// const ScatterChart = rd3.ScatterChart;
// const CandleStickChart = rd3.CandleStickChart;
    var barData = [
      {
        "name": "Series A",
        "values": [
          { "x": 1, "y":  91},
          { "x": 2, "y": 100},
          { "x": 3, "y": 20},
          { "x": 4, "y": -20},
          { "x": 5, "y": -110},
          { "x": 6, "y": 34},
          { "x": 7, "y": 12},
          { "x": 8, "y": 12},
          { "x": 9, "y": 12},
          { "x": 10, "y": 12}

        ]
      }
      // ,
      // {
      //   "name": "Series B",
      //   "values": [
      //     { "x": 1, "y":  9},
      //     { "x": 2, "y": 49},
      //     { "x": 3, "y": -80},
      //   ]
      // }
    ];

    return  (<div>
      <p>{this.props.data, 'line 56 in bar component'}</p>
      <LineChart
        data={barData}
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
