import React from "react";
import { Survey } from "./SurveyApp/component";
import SurveyData from "./SurveyApp/survey.json";

const App = (props) => {
  return (
    <div className="container">
      <div className="col-6 mx-auto text-left">
        <h1 className="m-auto">Survey</h1>
        <Survey inputs={SurveyData} />
      </div>
    </div>
  );
};

export default App;
