import React from "react";
import { Survey } from "./SurveyApp/component";
import SurveyData from "./SurveyApp/survey.json";
import { Link } from "react-router-dom";

const App = (props) => {
  return (
    <>
      <div className="container">
        <nav className="navbar">
          <button name="loadSurvey-btn" className="btn btn-primary my-5 mx-5">
            <Link className="white" to="/loadedSurvey">
              Load Survey
            </Link>
          </button>
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
