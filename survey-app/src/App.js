import React from "react";
import { Survey } from "./SurveyApp/component";
import SurveyData from "./SurveyApp/survey.json";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="container">
        <nav className="navbar">
          <Link className="btn btn-primary" to="/loadedSurvey">
            Load Survey
          </Link>
        </nav>
      </div>
      <div className="container">
        <div className="col-6 mx-auto text-left">
          <h1 className="m-auto">Survey</h1>
          <Survey inputs={SurveyData} />
        </div>
      </div>
    </>
  );
};

export default App;
