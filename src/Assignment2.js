import React from 'react';
import { useFetch } from "./hooks/useFetch";
import { scaleLinear}  from "d3-scale";
import { extent, max, min, bin } from "d3-array";

function Assignment2(props) {
  // const {data, loading, size, margin} = props;

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
      <p>The dataset I chose to work with is the <a href="https://www.kaggle.com/ajaypalsinghlo/world-happiness-report-2021">2021 World Happiness Report</a>, where the happiness score is explained by 6 factors: economic production, social support, life expectancy, freedom, trust in government, and generosity. The dataset provides scores for happiness and the 6 factors for 149 countries. For the analysis of the dataset, I wanted to focus on happiness, life expectancy, and social support scores, and explore the relationship between happiness and the 2 factors. While happiness scores are explained by the 6 factors and scored from 0 to 10, life expectancy is based on data from the World Health Organization and social support is the national average of the binary response (0 for no, 1 for yes) to the question, "If you were in trouble, do you have relatives or friends you can count on to help you whenever you need them, or not?" (<a href="https://worldhappiness.report/ed/2020/social-environments-for-world-happiness/">World Happiness Report</a>). In the previous analysis of the dataset, I found that the North America and ANZ (Australia and New Zealand) region had the highest average happiness score while the South Asia region had the lowest average happiness score, so the questions I wanted to address are:</p>

      <ol>
        <li>What are the distributions of happiness scores, life expectancy, and social support for all countries?</li>
        <li>How do the distributions of happiness scores, life expectancy, and social support for the North America and ANZ region compare to the distributions for the rest of the countries?</li>
        <li>How do the distributions of happiness scores, life expectancy, and social support for the South Asia region compare to the distribution for the rest of the countries?</li>
      </ol>

      <h2>1. What are the distributions of happiness scores, life expectancy, and social support for all countries?</h2>
      <h3>Distribution of Happiness Scores for All Countries</h3>
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
      <p>This barcode plot shows the distribution of happiness scores for all countries. The maximum and minimum happiness scores are 7.8 and 2.5, respectively. The distribution is relatively even with the majority of the scores residing near the middle of the distribution.</p>

      <h3>Distribution of Life Expectancy for All Countries</h3>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 259} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          49
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
      <p>This barcode plot shows the distribution of life expectancy for all countries. The maximum and minimum life expectancy ages are 77 and 49, respectively. The majority of distribution is at the top half of the distribution, which shows that most of the countries' life expectancy is closer to the maximum than the minimum age.</p>

      <h3>Distribution of Social Support Scores for All Countries</h3>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 179} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0.46
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 119} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0.98
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 182}
          x2={size / 2 - 13}
          y2={size - 182}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 116}
          x2={size / 2 - 13}
          y2={margin + 116}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          return (
            <line 
              key={index} 
              x1={size / 2}
              y1={size - margin - measurement["Social support"] * 350}
              x2={size / 2 + 20} 
              y2={size - margin - measurement["Social support"] * 350} 
              stroke={"steelblue"} 
              strokeOpacity="0.6"
            />
          );
        })}
      </svg>
      <p>This barcode plot shows the distribution of social support scores for all countries. The maximum and minimum values are 0.98 and 0.46, respectively. The visualization shows that the majority of people in most of the countries answered yes to the question "If you were in trouble, do you have relatives or friends you can count on to help you whenever you need them, or not?"</p>

      <h2>2. How do the distributions of happiness scores, life expectancy, and social support for the North America and ANZ region compare to the distributions for the rest of the countries?</h2>
      <h3>Highlighting the Distribution of Happiness Scores in North America and ANZ</h3>
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

        <text 
          x={size / 2 + 50} 
          textAnchor="end" 
          y={size - 364} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          7.0
        </text>

        <text 
          x={size / 2 + 50} 
          textAnchor="end" 
          y={margin + 99} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          7.3
        </text>

        <line
          x1={size / 2 + 30}
          y1={size - 367}
          x2={size / 2 + 35}
          y2={size - 367}
          stroke={"black"}
        />

        <line
          x1={size / 2 + 30}
          y1={margin + 96}
          x2={size / 2 + 35}
          y2={margin + 96}
          stroke={"black"}
        />
        
        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "North America and ANZ";
          // return (
          //   <line 
          //     key={index} 
          //     x1={size / 2}
          //     y1={size - margin - measurement["Ladder score"] * 50}
          //     x2={size / 2 + 20} 
          //     y2={size - margin - measurement["Ladder score"] * 50} 
          //     stroke={highlight ? "red" : "steelblue"} 
          //     strokeOpacity={highlight ? 0.9 : 0.4} 
          //   />
          // );
          return (
            <circle 
              key={index} 
              cx={highlight ? size / 2 + 20 : size / 2} 
              cy={size - margin - measurement["Ladder score"] * 50} 
              r="3" 
              fill="none" 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity="0.5" 
            />
          );
        })}
      </svg>
      <p>This plot extracts the happiness scores for countries in the North America and ANZ region and compares them to the distribution of happiness scores for the rest of the countries. The maximum and minimum values for the North America and ANZ region are 7.3 and 7.0, respectively. As expected, the happiness scores for countries in the North America and ANZ region are near the top of the distribution. The four countries within the North America and ANZ region have very similar happiness scores.</p>

      <h3>Highlighting the Distribution of Life Expectancy in North America and ANZ</h3>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 259} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          49
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
        
        <text 
          x={size / 2 + 48} 
          textAnchor="end" 
          y={size - 358} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          68
        </text>

        <text 
          x={size / 2 + 48} 
          textAnchor="end" 
          y={margin + 93} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          74
        </text>

        <line
          x1={size / 2 + 30}
          y1={size - 361}
          x2={size / 2 + 35}
          y2={size - 361}
          stroke={"black"}
        />

        <line
          x1={size / 2 + 30}
          y1={margin + 90}
          x2={size / 2 + 35}
          y2={margin + 90}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "North America and ANZ";
          // return (
          //   <line 
          //     key={index} 
          //     x1={size / 2}
          //     y1={size - margin - measurement["Healthy life expectancy"] * 5}
          //     x2={size / 2 + 20} 
          //     y2={size - margin - measurement["Healthy life expectancy"] * 5} 
          //     stroke={highlight ? "red" : "steelblue"} 
          //     strokeOpacity={highlight ? 1 : 0.25} 
          //   />
          // );
          return (
            <circle 
              key={index} 
              cx={highlight ? size / 2 + 20 : size / 2} 
              cy={size - margin - measurement["Healthy life expectancy"] * 5} 
              r="3" 
              fill="none" 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity="0.5" 
            />
          );
        })}
      </svg>
      <p>This plot extracts the life expectancies for countries in the North America and ANZ region and compares them to the distribution of life expectancy for the rest of the countries. The maximum and minimum values for the North America and ANZ region are 74 and 68, respectively. Similar to the last plot, the life expectancies for countries in the North America and ANZ region are near the top of the distribution.</p>

      <h3>Highlighting the Distribution of Social Support Scores in North America and ANZ</h3>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 179} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0.46
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 119} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0.98
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 182}
          x2={size / 2 - 13}
          y2={size - 182}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 116}
          x2={size / 2 - 13}
          y2={margin + 116}
          stroke={"black"}
        />

        <text 
          x={size / 2 + 55} 
          textAnchor="end" 
          y={size - 339} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0.92
        </text>

        <text 
          x={size / 2 + 55} 
          textAnchor="end" 
          y={margin + 130} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0.95
        </text>

        <line
          x1={size / 2 + 30}
          y1={size - 342}
          x2={size / 2 + 35}
          y2={size - 342}
          stroke={"black"}
        />

        <line
          x1={size / 2 + 30}
          y1={margin + 127}
          x2={size / 2 + 35}
          y2={margin + 127}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "North America and ANZ";
          // return (
          //   <line 
          //     key={index} 
          //     x1={size / 2}
          //     y1={size - margin - measurement["Logged GDP per capita"] * 25}
          //     x2={size / 2 + 20} 
          //     y2={size - margin - measurement["Logged GDP per capita"] * 25} 
          //     stroke={highlight ? "red" : "steelblue"} 
          //     strokeOpacity={highlight ? 0.9 : 0.3} 
          //   />
          // );
          return (
            <circle 
              key={index} 
              cx={highlight ? size / 2 + 20 : size / 2} 
              cy={size - margin - measurement["Social support"] * 350} 
              r="3" 
              fill="none" 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity="0.5" 
            />
          );
        })}
      </svg>
      <p>This plot extracts the social support scores for countries in the North America and ANZ region and compares them to the distribution of social support scores for the rest of the countries. The maximum and minimum values for the North America and ANZ region are 0.95 and 0.92, respectively. Similar to the last two plots, the social support scores for countries in the North America and ANZ region are near the top of the distribution. This suggests that the relatively high happiness score for the region could be explained by its higher life expectancy and social support scores.</p>

      <h2>3. How do the distributions of happiness scores, life expectancy, and social support for the South Asia region compare to the distribution for the rest of the countries?</h2>
      <h3>Highlighting the Distribution of Happiness Scores in South Asia</h3>
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
          7.3
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

        <text 
          x={size / 2 + 50} 
          textAnchor="end" 
          y={size - 143} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          2.5
        </text>

        <text 
          x={size / 2 + 50} 
          textAnchor="end" 
          y={margin + 199} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          5.3
        </text>

        <line
          x1={size / 2 + 30}
          y1={size - 146}
          x2={size / 2 + 35}
          y2={size - 146}
          stroke={"black"}
        />

        <line
          x1={size / 2 + 30}
          y1={margin + 196}
          x2={size / 2 + 35}
          y2={margin + 196}
          stroke={"black"}
        />
        
        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "South Asia";
          // return (
          //   <line 
          //     key={index} 
          //     x1={size / 2}
          //     y1={size - margin - measurement["Ladder score"] * 50}
          //     x2={size / 2 + 20} 
          //     y2={size - margin - measurement["Ladder score"] * 50} 
          //     stroke={highlight ? "red" : "steelblue"} 
          //     strokeOpacity={highlight ? 0.9 : 0.4} 
          //   />
          // );
          return (
            <circle 
              key={index} 
              cx={highlight ? size / 2 + 20 : size / 2} 
              cy={size - margin - measurement["Ladder score"] * 50} 
              r="3" 
              fill="none" 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity="0.5" 
            />
          );
        })}
      </svg>
      <p>This plot extracts the happiness scores for countries in the South Asia region and compares them to the distribution of happiness scores for the rest of the countries. The maximum and minimum values for the South Asia region are 5.3 and 2.5, respectively. Unlike the distribution of happiness scores for the North American and ANZ region, these happiness scores are more spread out. It is possible that the country with the score of 2.5 is an outlier and is the reason why the South Asia region had the lowest average happiness scores.</p>

      <h3>Highlighting the Distribution of Life Expectancy in South Asia</h3>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 259} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          49
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

        <text 
          x={size / 2 + 48} 
          textAnchor="end" 
          y={size - 279} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          52
        </text>

        <text 
          x={size / 2 + 48} 
          textAnchor="end" 
          y={margin + 110} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          71
        </text>

        <line
          x1={size / 2 + 30}
          y1={size - 282}
          x2={size / 2 + 35}
          y2={size - 282}
          stroke={"black"}
        />

        <line
          x1={size / 2 + 30}
          y1={margin + 107}
          x2={size / 2 + 35}
          y2={margin + 107}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "South Asia";
          // return (
          //   <line 
          //     key={index} 
          //     x1={size / 2}
          //     y1={size - margin - measurement["Healthy life expectancy"] * 5}
          //     x2={size / 2 + 20} 
          //     y2={size - margin - measurement["Healthy life expectancy"] * 5} 
          //     stroke={highlight ? "red" : "steelblue"} 
          //     strokeOpacity={highlight ? 1 : 0.25} 
          //   />
          // );
          return (
            <circle 
              key={index} 
              cx={highlight ? size / 2 + 20 : size / 2} 
              cy={size - margin - measurement["Healthy life expectancy"] * 5} 
              r="3" 
              fill="none" 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity="0.5" 
            />
          );
        })}
      </svg>
      <p>This plot extracts the life expectancies for countries in the South Asia region and compares them to the distribution of life expectancy for the rest of the countries. The maximum and minimum values for the South Asia region are 71 and 52, respectively. Similar to the last plot, the distribution of life expectancy for the region is spread out. This could mean that for countries in the South Asia region, life expectancy does not necessarily relate to the overall happiness of the country.</p>

      <h3>Highlighting the Distribution of Social Support Scores in South Asia</h3>
      <svg width={size} height={size} style={{border: "1px solid black"}}>
        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={size - 179} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0.46
        </text>

        <text 
          x={size / 2 - 20} 
          textAnchor="end" 
          y={margin + 119} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0.98
        </text>

        <line
          x1={size / 2 - 18}
          y1={size - 182}
          x2={size / 2 - 13}
          y2={size - 182}
          stroke={"black"}
        />

        <line
          x1={size / 2 - 18}
          y1={margin + 116}
          x2={size / 2 - 13}
          y2={margin + 116}
          stroke={"black"}
        />

        <text 
          x={size / 2 + 55} 
          textAnchor="end" 
          y={size - 179} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0.46
        </text>

        <text 
          x={size / 2 + 55} 
          textAnchor="end" 
          y={margin + 143} 
          style={{fontSize: 10, fontFamily: "Gill Sans, san serif"}}
        >
          0.91
        </text>

        <line
          x1={size / 2 + 30}
          y1={size - 182}
          x2={size / 2 + 35}
          y2={size - 182}
          stroke={"black"}
        />

        <line
          x1={size / 2 + 30}
          y1={margin + 140}
          x2={size / 2 + 35}
          y2={margin + 140}
          stroke={"black"}
        />

        {data.map((measurement, index) => {
          const highlight = measurement["Regional indicator"] === "South Asia";
          // return (
          //   <line 
          //     key={index} 
          //     x1={size / 2}
          //     y1={size - margin - measurement["Logged GDP per capita"] * 25}
          //     x2={size / 2 + 20} 
          //     y2={size - margin - measurement["Logged GDP per capita"] * 25} 
          //     stroke={highlight ? "red" : "steelblue"} 
          //     strokeOpacity={highlight ? 0.9 : 0.3} 
          //   />
          // );
          return (
            <circle 
              key={index} 
              cx={highlight ? size / 2 + 20 : size / 2} 
              cy={size - margin - measurement["Social support"] * 350} 
              r="3" 
              fill="none" 
              stroke={highlight ? "red" : "steelblue"} 
              strokeOpacity="0.5" 
            />
          );
        })}
      </svg>
      <p>This plot extracts the social support scores for countries in the South Asia region and compares them to the distribution of social support scores for the rest of the countries. The maximum and minimum values for the South Asia region are 0.91 and 0.46, respectively. Once again, the distribution of social support scores is spread out. Like the last plot, this could mean that the happiness of countries in South Asia is not strongly explained by the social support factor.</p>

      <h2>Write-Up</h2>

      <p>The questions I came up with are:</p>

      <ol>
        <li>What are the distributions of happiness scores, life expectancy, and social support for all countries?</li>
        <li>How do the distributions of happiness scores, life expectancy, and social support for the North America and ANZ region compare to the distributions for the rest of the countries?</li>
        <li>How do the distributions of happiness scores, life expectancy, and social support for the South Asia region compare to the distribution for the rest of the countries?</li>
      </ol>
      
      <p>The analysis process I used first involved exploring the data and doing research on how the data was collected. This included understanding where the life expectancy data came from and how the social support factor was measured. After the research, I narrowed down the scope of the dataset based on personal interest and decided what questions I wanted to answer with the visualizations. This is where I decided to focus on the happiness scores and the life expectancy and social support factors. My next step was to plan out the visualizations I wanted to create in order to answer the questions I came up with. Lastly, I created the visualizations, using 3 visualizations to address each of the questions. The primary data transformation I used was filtering the data based on the region and attribute I wanted to focus on.</p>

      <p>One of the lessons I learned was the importance of conducting research on the dataset and understanding where the data comes from. This was useful for the process of analyzing data and drawing conclusions from the visualizations because it helped to make sense of what the numbers meant. Another lesson I learned was the importance of looking at the size of the data. For example, there are only 4 countries in the North America and ANZ region so it is more difficult to draw conclusions on whether happiness scores are related to life expectancy and social support. For further analysis of the dataset, it may be helpful to group the North America and ANZ region with the Western Europe region, which had the second-highest average happiness score. Finally, another lesson I learned was to ask critical questions when looking at visualizations. For example, when I was looking at the distribution of scores in the South Asia region, I had to consider factors such as the possibility of outliers when trying to draw conclusions from the visualizations.</p>

      <h2>Peer Feedback</h2>
      <p>A feedback I implemented was adding headings to each visualization group to clarify which visualizations are answering which questions. Another feedback I implemented was adding axis labels for the last 6 visualizations to mark the maximum and minimum values for the highlighted data.</p>

    </div>
  );
}

export default Assignment2;