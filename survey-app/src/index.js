import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";
import LoadedSurvey from "./SurveyApp/Routes/loadedSurvey";
import ThankYou from "./SurveyApp/Routes/thankyou";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/survey" compenent={App} />
      <Route path="/loadedSurvey" component={LoadedSurvey} />
      <Route path="/thankyou" component={ThankYou} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
