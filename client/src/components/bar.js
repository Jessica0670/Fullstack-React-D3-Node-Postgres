import React from 'react';
import $ from 'jquery';
import * as d3 from "d3";
// import rd3 from 'react-d3';
import rd3 from 'rd3';
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
          { "x": 2, "y": 290},
          { "x": 3, "y": 20},
          { "x": 4, "y": -20},
          { "x": 5, "y": -180},
          { "x": 6, "y": 34},
          { "x": 7, "y": 12},

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
      // },
      // {
      //   "name": "Series C",
      //   "values": [
      //     { "x": 1, "y":  14},
      //     { "x": 2, "y": 77},
      //     { "x": 3, "y": 50},
      //   ]
      // }
    ];

    return  (<div>
<LineChart
data={barData}
width={800}
height={300}
title="Line Chart"
yAxisLabel="Score"
xAxisLabel="Elapsed Time (5 minutes)"
gridVertical={true}
gridVerticalStrokeDash={'1, 0'}
/>
  </div>)}
};

export default Chart;
