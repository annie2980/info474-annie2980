import React, { useState } from 'react';
import { useFetch } from "./hooks/useFetch";
import { scaleLinear}  from "d3-scale";
import { extent, max, min, bin } from "d3-array";
import { scale } from "vega";
// import * as topojson from "topojson-client";
// import world from "../land-50m";

function ClassExample(props) {
  // const {data, loading, size, margin} = props;

  const [data, loading] = useFetch(
    "https://raw.githubusercontent.com/colinmegill/react-parcel-starter/main/weather.csv"
  );

  const [testCount , setTestCount] = useState(452);

  const [selectedStation , setSelectedStation] = useState("KALISPELL GLACIER AP");

  const dataSmallSample = data.slice(0, 5000);

  const TMAXextent = extent(dataSmallSample, (d) => {
    return +d.TMAX;
  });

  // const land = topojson.feature(world, world.objects.land);
  // const projection = d3.geoNaturalEarth1();
  // const path = d3.geoPath(projection);
  // const mapPathString = path(land);

  const size = 500;
  const margin = 20;
  const axisTextAlignmentFactor = 3;
  const yScale = scaleLinear()
    .domain(TMAXextent) // unit: km
    .range([size - margin, size - 350]); // unit: pixels

  _bins = bin().thresholds(30);
  tmaxBins = _bins(
    data.map((d) => {
      return +d.TMAX;
    })
  );

  // console.log(
  //   tmaxBins.map((bin, i) => {
  //     console.log(i, bin.x0, bin.x1, bin);
  //   })
  // );

  const histogramLeftPadding = 20;

  /*
    binning https://observablehq.com/@d3/d3-bin  
    geo https://observablehq.com/@d3/world-airports?collection=@d3/d3-geo https://github.com/d3/d3-geo
    auto axes / ticks https://observablehq.com/@uwdata/scales-axes-and-legends?collection=@uwdata/visualization-curriculum
    means https://danfo.jsdata.org/
    line graph with d3 https://observablehq.com/@d3/line-chart?collection=@d3/d3-shape https://github.com/d3/d3-shape 
    dotplots 
    ordinal data, legends
    componetization 
  */

  {
    /* <rect x={index * 11} y={size} width="10" height={bin.length} /> */
  }
  
  // console.log("From Hook: ", loading, data);

  return (
    <div>
      <h1>Class Example</h1>
      <p>{loading && "Loading data!"}</p>

      <h3>
        Barcode plot TMAX at Kalispell Glacier (sounds cold, expect it to be
        lower than average)
      </h3>
      {/* <p onClick={() => {setTestCount(testCount + 1)}}>{testCount}</p> */}
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        <text
          x={size / 2 - 12}
          textAnchor="end"
          y={size - margin + axisTextAlignmentFactor}
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          0
        </text>
        <text
          x={size / 2 - 12}
          textAnchor="end"
          y={size - margin - 100 + axisTextAlignmentFactor}
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          100
        </text>
        <line
          x1={size / 2 - 10}
          y1={size - margin - 100}
          x2={size / 2 - 5}
          y2={size - margin - 100}
          stroke={"black"}
        />
        <line
          x1={size / 2 - 10}
          y1={size - margin}
          x2={size / 2 - 5}
          y2={size - margin}
          stroke={"black"}
        />

        {data.slice(0, 1000).map((measurement, index) => {
          const highlight = measurement.station === selectedStation;
          return (
            <line
              key={index}
              // onClick={() => console.log(measurement.station)}
              onMouseEnter={() => {
                setSelectedStation(measurement.station);
              }}
              x1={size / 2}
              y1={size - margin - measurement.TMAX}
              x2={highlight ? size / 2 + 30 : size / 2 + 20}
              y2={size - margin - measurement.TMAX}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            >
              <title>{measurement.station}</title>
            </line>
          );
        })}
        <text
          x={size - 200}
          y={size - margin}
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          {selectedStation}
        </text>
      </svg>

      {/* <h3> Working with geo data </h3>
      <svg width={1000} height={600} style={{ border: "1px solid black" }}>
        <path d={mapPathString} fill="rgb(200, 200, 200)" />
        {dataSmallSample.map((measurement) => {
          return (
            <circle
              transform={`translate(
                ${projection([measurement.longitude, measurement.latitude])})`}
              r="1.5"
            />
          );
        })}
      </svg> */}

      <h3> Binning </h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        {tmaxBins.map((bin, i) => {
          return (
            <rect
              y={size - 50 - bin.length}
              width="10"
              height={bin.length}
              x={histogramLeftPadding + i * 11}
            />
          );
        })}
      </svg>

      <h3>Temperatures</h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        <text
          x={size / 2 - 12}
          y={yScale(0) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          0
        </text>
        <text
          x={size / 2 - 12}
          y={yScale(100) + axisTextAlignmentFactor}
          textAnchor="end"
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          100
        </text>
        <line
          x1={size / 2 - 10}
          y1={yScale(100)}
          x2={size / 2 - 5}
          y2={yScale(100)}
          stroke={"black"}
        />
        <line
          x1={size / 2 - 10}
          y1={yScale(0)}
          x2={size / 2 - 5}
          y2={yScale(0)}
          stroke={"black"}
        />

        {dataSmallSample.map((measurement, index) => {
          const highlight = measurement.station === "KALISPELL GLACIER AP";
          return (
            <line
              key={index}
              x1={size / 2}
              y1={yScale(measurement.TMAX)}
              x2={size / 2 + 20}
              y2={yScale(measurement.TMAX)}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })}
      </svg>

      <h3>Scatterplot</h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        {dataSmallSample.map((measurement, index) => {
          const highlight = measurement.station === "KALISPELL GLACIER AP";
          return (
            <circle
              key={index}
              cx={100 - measurement.TMIN}
              cy={size - margin - measurement.TMAX}
              r="3"
              fill="none"
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity="0.2"
            />
          );
        })}
      </svg>

      <h3>
        Barcode plot TMAX at Kalispell Glacier (sounds cold, expect it to be
        lower than average)
      </h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        <text
          x={size / 2 - 12}
          textAnchor="end"
          y={size - margin + axisTextAlignmentFactor}
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          0
        </text>
        <text
          x={size / 2 - 12}
          textAnchor="end"
          y={size - margin - 100 + axisTextAlignmentFactor}
          style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}
        >
          100
        </text>
        <line
          x1={size / 2 - 10}
          y1={size - margin - 100}
          x2={size / 2 - 5}
          y2={size - margin - 100}
          stroke={"black"}
        />
        <line
          x1={size / 2 - 10}
          y1={size - margin}
          x2={size / 2 - 5}
          y2={size - margin}
          stroke={"black"}
        />

        {data.slice(0, 1000).map((measurement, index) => {
          const highlight = measurement.station === "KALISPELL GLACIER AP";
          return (
            <line
              key={index}
              x1={size / 2}
              y1={size - margin - measurement.TMAX}
              x2={size / 2 + 20}
              y2={size - margin - measurement.TMAX}
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity={highlight ? 1 : 0.1}
            />
          );
        })}
      </svg>

      <h3>
        TMAX at Kalispell Glacier (sounds cold, expect it to be lower than
        average)
      </h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        {data.slice(0, 300).map((measurement, index) => {
          const highlight = measurement.station === "KALISPELL GLACIER AP";
          return (
            <circle
              key={index}
              cx={highlight ? size / 2 : size / 2 - 20}
              cy={size - margin - measurement.TMAX}
              r="3"
              fill="none"
              stroke={highlight ? "red" : "steelblue"}
              strokeOpacity="0.2"
            />
          );
        })}
      </svg>
      <h3>Rendering circles :) this shows a distribution of TMAX</h3>
      <svg width={size} height={size} style={{ border: "1px solid black" }}>
        {data.slice(0, 300).map((measurement, index) => {
          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size - margin - measurement.TMAX}
              r="3"
              fill="none"
              stroke={"steelblue"}
              strokeOpacity="0.2"
            />
          );
        })}
      </svg>

      {/* <h2>Binning</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        {happinessBins.map((bin, i) => {
          return (
            <rect 
              y={size - 100}
              width="20"
              height="10"
              x={histogramLeftPadding + i * 21}
            />
          );
        })}
      </svg> */}

      {/* <h2>Scale in d3</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 12} 
          y={yScale(0)} 
          textAnchor="end" 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0
        </text>

        <text 
          x={size / 2 - 12} 
          y={yScale(100)} 
          textAnchor="end" 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          10
        </text>

        <line
          x1={size / 2 - 10}
          y1={yScale(100)}
          x2={size / 2 - 5}
          y2={yScale(100)}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 10}
          y1={yScale(0)}
          x2={size / 2 - 5}
          y2={yScale(0)}
          stroke={"black"}
        />
        
        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "Western Europe";
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Ladder score"] * 50}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Ladder score"] * 50} 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity={highlight ? 0.5 : 0.2} 
            />
          );
        })}
      </svg> */}

      {/* <h2>Scatterplot of life expectancy and happiness scores</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "Western Europe";
          return (
            <circle 
              key={index} 
              cx={measurement["Healthy life expectancy"] * 5} 
              cy={size - margin - measurement["Ladder score"] * 50} 
              r="3" 
              fill="none" 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity="0.2" 
            />
          );
        })}
      </svg> */}

      {/* <h2>Barcode plot of happiness scores within Western Europe</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 12} 
          textAnchor="end" 
          y={size - margin} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0
        </text>

        <text 
          x={size / 2 - 12} 
          textAnchor="end" 
          y={margin} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          10
        </text>

        <line
          x1={size / 2 - 10}
          y1={size - margin - 3}
          x2={size / 2 - 5}
          y2={size - margin - 3}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 10}
          y1={margin - 3}
          x2={size / 2 - 5}
          y2={margin - 3}
          stroke={"black"}
        />
        
        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "Western Europe";
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Ladder score"] * 50}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Ladder score"] * 50} 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity={highlight ? 0.5 : 0.2} 
            />
          );
        })}
      </svg> */}

      {/* <h2>Happiness scores within Western Europe</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "Western Europe";
          return (
            <circle 
              key={index} 
              cx={highlight ? size / 2 : size / 2 - 20} 
              cy={size - margin - measurement["Ladder score"] * 50} 
              r="3" 
              fill="none" 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity="0.2" 
            />
          );
        })}
      </svg> */}

      {/* <h2>Rendering circles :) This shows a distribution of happiness scores</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        {data.map((measurement, index) => {
          return (
            <circle 
              key={index} 
              cx={size / 2} 
              cy={size - margin - measurement["Ladder score"] * 50} 
              r="3" 
              fill="none" 
              stroke={"steelblue"} 
              strokeOpacity="0.2" 
            />
          );
        })}
      </svg> */}
    </div>
  );
}

export default ClassExample;