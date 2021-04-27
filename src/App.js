import React from "react";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear}  from "d3-scale";
import { extent, max, min, bin } from "d3-array";
// import { vl } from "@vega/vega-lite-api";
// import { vl } from "vega-lite-api";


const App = () => {

  // vl.markBar().data('world-happiness-report-2021.json').encode(
  //   vl.x().fieldQ('Ladder score').bin(true),
  //   vl.y().count()
  // )

  const [data, loading] = useFetch(
    "https://raw.githubusercontent.com/annie2980/info474-annie2980/main/world-happiness-report-2021.csv"
  );

  // const dataSmallSample = data.slice(0, 300);

  const extentHappinessScore = extent(data, (d) => {
    return +d["Ladder score"];
  });

  // console.log(extentHappinessScore);

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

  // console.log(yScale);

  // _bins = bin();
  // happinessBins = _bins(
  //   data.map((d) => {
  //     return +d["Ladder score"];
  //   })
  // );
  // console.log(
  //   happinessBins.map((bin, i) => {
  //     console.log(i, bin.x0, bin.x1, bin);
  //   })
  // );
  
  // console.log("From Hook: ", loading, data);
  return (
    <div>
      <h1>Exploratory Data Analysis of World Happiness Scores</h1>
      <p>{loading && "Loading data!"}</p>

      <h2>Introduction</h2>
      <p>The dataset I chose to work with is the <a href="https://www.kaggle.com/ajaypalsinghlo/world-happiness-report-2021">2021 World Happiness Report</a>, where happiness score is explained by 6 factors: economic production, social support, life expectancy, freedom, trust in government, and generosity. The dataset provides scores for happiness and the 6 factors for 149 countries. In the previous analysis of the dataset, I found that the North America and ANZ (Australia and New Zealand) region had the highest average happiness score while the South Asia region had the lowest average happiness score, so the questions I want to address are:</p>

      <ol>
        <li>What are the distributions of happiness scores, life expectancy, and GDP per capita for all countries?</li>
        <li>How do the distributions of happiness scores, life expectancy, and GDP per capita for the North America and ANZ region compare to the distributions for all countries?</li>
        <li>How do the distributions of happiness scores, life expectancy, and GDP per capita for the South Asia region compare to the distributsion for all countries?</li>
      </ol>

      <p></p>

      <h2>Distribution of Happiness Scores for All Countries</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 143} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          2.5
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 71} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          7.8
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 146}
          x2={size / 2 - 13}
          y2={size - 146}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 68}
          x2={size / 2 - 13}
          y2={margin + 68}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Ladder score"] * 50}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Ladder score"] * 50} 
              stroke={"steelblue"} 
              strokeOpacity="0.6"
            />
          );
        })}
      </svg>

      <h2>Distribution of Life Expectancy for All Countries</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 259} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          48.5
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 78} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          77
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 262}
          x2={size / 2 - 13}
          y2={size - 262}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 75}
          x2={size / 2 - 13}
          y2={margin + 75}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Healthy life expectancy"] * 5}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Healthy life expectancy"] * 5} 
              stroke={"steelblue"} 
              strokeOpacity="0.6"
            />
          );
        })}
      </svg>

      <h2>Distribution of GDP per Capita for All Countries</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 182} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          6.6
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 171} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          11.6
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 185}
          x2={size / 2 - 13}
          y2={size - 185}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 168}
          x2={size / 2 - 13}
          y2={margin + 168}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Logged GDP per capita"] * 25}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Logged GDP per capita"] * 25} 
              stroke={"steelblue"} 
              strokeOpacity="0.6"
            />
          );
        })}
      </svg>

      <h2>Highlighting the Distribution of Happiness Scores in North America and ANZ</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
      <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 143} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          2.5
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 71} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          7.8
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 146}
          x2={size / 2 - 13}
          y2={size - 146}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 68}
          x2={size / 2 - 13}
          y2={margin + 68}
          stroke={"black"}
        />
        
        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "North America and ANZ";
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Ladder score"] * 50}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Ladder score"] * 50} 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity={highlight ? 0.9 : 0.4} 
            />
          );
        })}
      </svg>

      <h2>Highlighting the Distribution of Life Expectancy in North America and ANZ</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 259} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          48.5
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 78} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          77
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 262}
          x2={size / 2 - 13}
          y2={size - 262}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 75}
          x2={size / 2 - 13}
          y2={margin + 75}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "North America and ANZ";
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Healthy life expectancy"] * 5}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Healthy life expectancy"] * 5} 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity={highlight ? 1 : 0.25} 
            />
          );
        })}
      </svg>

      <h2>Highlighting the Distribution of GDP per Capita in North America and ANZ</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 182} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          6.6
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 171} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          11.6
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 185}
          x2={size / 2 - 13}
          y2={size - 185}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 168}
          x2={size / 2 - 13}
          y2={margin + 168}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "North America and ANZ";
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Logged GDP per capita"] * 25}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Logged GDP per capita"] * 25} 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity={highlight ? 0.9 : 0.3} 
            />
          );
        })}
      </svg>

      <h2>Highlighting the Distribution of Happiness Scores in South Asia</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
      <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 143} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          2.5
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 71} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          7.8
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 146}
          x2={size / 2 - 13}
          y2={size - 146}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 68}
          x2={size / 2 - 13}
          y2={margin + 68}
          stroke={"black"}
        />
        
        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "South Asia";
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Ladder score"] * 50}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Ladder score"] * 50} 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity={highlight ? 0.9 : 0.4} 
            />
          );
        })}
      </svg>

      <h2>Highlighting the Distribution of Life Expectancy in South Asia</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 259} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          48.5
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 78} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          77
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 262}
          x2={size / 2 - 13}
          y2={size - 262}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 75}
          x2={size / 2 - 13}
          y2={margin + 75}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "South Asia";
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Healthy life expectancy"] * 5}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Healthy life expectancy"] * 5} 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity={highlight ? 1 : 0.25} 
            />
          );
        })}
      </svg>

      <h2>Highlighting the Distribution of GDP per Capita in South Asia</h2>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 182} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          6.6
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 171} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          11.6
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 185}
          x2={size / 2 - 13}
          y2={size - 185}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 168}
          x2={size / 2 - 13}
          y2={margin + 168}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "South Asia";
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Logged GDP per capita"] * 25}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Logged GDP per capita"] * 25} 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity={highlight ? 0.9 : 0.3} 
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
};
export default App;