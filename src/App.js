import React from "react";
import { csv } from "d3-fetch";

const App = () => {
  csv(
    "https://raw.githubusercontent.com/annie2980/info474-annie2980/main/world-happiness-report-2021.csv"
  ).then((data) => console.log(data));
  
  return (
    <div>
      <h1>Exploratory Data Analysis, Assignment 2, INFO 474 SP 2021</h1>
    </div>
  );
};
export default App;