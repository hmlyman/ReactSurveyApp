import React, { useState } from "react";
import {
  SurveyTextInput,
  SurveyRadioInput,
  SurveySelectInput,
  SurveyCheckboxInput,
  SurveySelectMultipleInput,
} from "./inputs";
import { isTextInput } from "./verifiers";
import { Link } from "react-router-dom";

export const Survey = (props) => {
  const [page, setPage] = useState(1);
  const [isFinalPage, setIsFinalPage] = useState(false);
  const [surveyValues, setSurveyValues] = useState({});
  const [question, setQuestion] = useState({});
  const triggerBackendUpdate = () => {
    console.log(question);
    console.log(surveyValues);
    setPage(1);
    setSurveyValues({});
    setQuestion({});
  };
  const [inlineData, setInlineData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    for (let formInput of event.target.elements) {
      const isText = isTextInput(formInput.type);
      console.log(formInput);
      if (isText) {
        surveyValues[formInput.name] = formInput.value;
        question[formInput.question] = formInput.question;
      }

      if (formInput.type === "selectMultiple") {
        let selected = [].filter.call(
          formInput.options,
          (option) => option.selected
        );
        console.log(formInput);
        console.log(selected);
        console.log(formInput.options.selected);

        const values = selected.map((option) => option.value);
        surveyValues[formInput.name] = values;
        question[formInput.name] = formInput.question;
      }

      if (formInput.type === "checkbox") {
        // let selected = [].filter.call(
        //   formInput.options,
        //   (option) => option.selected
        // );
        // console.log(selected);
        // console.log(formInput.options.selected);
        // let values = selected.map((options) => options.value);
        surveyValues[formInput.name] = formInput.value;
        question[formInput.name] = formInput.question;
      }
    }

    setQuestion(question);

    setSurveyValues(surveyValues);
    const nextPage = page + 1;
    const inputs = props.inputs
      ? props.inputs.filter((inputOption) => inputOption.page === nextPage)
      : [];

    if (isFinalPage) {
      triggerBackendUpdate();
    } else {
      if (inputs.length === 0) {
        setIsFinalPage(true);
      } else {
        setPage(nextPage);
      }
    }
  };

  const callback = (name, value) => {
    console.log("callback", name, value);
    inlineData[name] = value;
    setInlineData(inlineData);
    console.log(inlineData);
  };

  // const validateSurvey = (json) => {
  //   let validSurvey;
  //   try {
  //     validSurvey = JSON.stringify(JSON.parse(json), null, 2);
  //   } catch (e) {
  //     throw e;
  //   }
  //   return validSurvey;
  // };

  // const loadSurvey = () => {
  //   const json =
  //     window.localStorage.getItem(LOCALSTORAGE_KEY) ||
  //     JSON.stringify(inlineData, null, 2);
  //   this.setState({ json });
  // };

  const saveSurvey = async () => {
    await fetch("/api/survey", {
      method: "POST",
      body: JSON.stringify(inlineData),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error(error);
    });
  };

  const inputs = props.inputs
    ? props.inputs.filter((inputOption) => inputOption.page === page)
    : [];
  return (
    <form onSubmit={handleSubmit}>
      {isFinalPage !== true &&
        inputs.map((obj, index) => {
          let inputKey = `input-${index}-${page}`;

          return obj.type === "radio" || obj.type === "checkbox" ? (
            <SurveyRadioInput
              object={obj}
              type={obj.type}
              required={props.required}
              triggerCallback={callback}
              question={obj.question}
              defaultValue={obj.defaultValue}
              name={obj.name}
              key={inputKey}
            />
          ) : obj.type === "checkbox" ? (
            <SurveyCheckboxInput
              object={obj}
              type={obj.type}
              required={props.required}
              triggerCallback={callback}
              question={obj.question}
              defaultValue={obj.defaultValue}
              name={obj.name}
              key={inputKey}
            />
          ) : obj.type === "select" ? (
            <SurveySelectInput
              className="form-control mb-3 mt-3"
              object={obj}
              type={obj.type}
              question={obj.question}
              required={props.required}
              triggerCallback={callback}
              defaultValue={obj.defaultValue}
              name={obj.name}
              key={inputKey}
            />
          ) : obj.type === "selectMultiple" ? (
            <SurveySelectMultipleInput
              className="form-control mb-3 mt-3"
              object={obj}
              type={obj.type}
              question={obj.question}
              required={props.required}
              triggerCallback={callback}
              defaultValue={obj.defaultValue}
              name={obj.name}
              key={inputKey}
            />
          ) : (
            <SurveyTextInput
              className="mb-3 mt-3 form-control"
              object={obj}
              type={obj.type}
              question={props.question}
              required={props.required}
              triggerCallback={callback}
              placeholder={obj.placeholder}
              defaultValue={obj.defaultValue}
              name={obj.name}
              key={inputKey}
            />
          );
        })}

      {isFinalPage !== true ? (
        <button name="continue-btn" className="btn btn-primary my-5 mx-5">
          Continue
        </button>
      ) : (
        <Link to="/thankyou">
          <button
            onClick={saveSurvey}
            type="button"
            className="btn btn-primary my-5 mx-5"
          >
            Submit Survey
          </button>
        </Link>
      )}
    </form>
  );
};
