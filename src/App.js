import React from "react";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear}  from "d3-scale";
import { extent, max, min, bin } from "d3-array";

const App = () => {
  const [data, loading] = useFetch(
    "https://raw.githubusercontent.com/annie2980/info474-annie2980/main/world-happiness-report-2021.csv"
  );

  console.log(data.slice(0, 5));

  // const dataSmallSample = data.slice(0, 300);

  const extentHappinessScore = extent(data, (d) => {
    return +d["Ladder score"];
  });

  console.log(extentHappinessScore);

  // const maxValueOfHappinessScore = max(
  //   data.map((measurement) => {
  //     return +measurement["Ladder score"]
  //   })
  // )

  // const minValueOfHappinessScore = min(
  //   data.map((measurement) => {
  //     return +measurement["Ladder score"]
  //   })
  // )

  // console.log(maxValueOfHappinessScore, minValueOfHappinessScore);

  const size = 500;
  const margin = 20;
  const histogramLeftPadding = 10;

  const yScale = scaleLinear()
    .domain(extentHappinessScore)
    .range([size - margin, size - 350]); // unit: pixels

  console.log(yScale);

  _bins = bin();
  happinessBins = _bins(
    data.map((d) => {
      return +d["Ladder score"];
    })
  );
  console.log(
    happinessBins.map((bin, i) => {
      console.log(i, bin.x0, bin.x1, bin);
    })
  );
  
  // console.log("From Hook: ", loading, data);
  return (
    <div>
      <h1>Exploratory Data Analysis, Assignment 2, INFO 474 SP 2021</h1>
      <p>{loading && "Loading data!"}</p>

      <h2>Binning</h2>
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
      </svg>

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

      <h2>Scatterplot of life expectancy and happiness scores</h2>
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
      </svg>

      <h2>Barcode plot of happiness scores within Western Europe</h2>
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
      </svg>

      <h2>Happiness scores within Western Europe</h2>
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
      </svg>

      <h2>Rendering circles :) This shows a distribution of happiness scores</h2>
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
      </svg>
    </div>
  );
};
export default App;