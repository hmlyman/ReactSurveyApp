import React, { useState, useEffect } from "react";
import { SurveyTextInput, SurveyRadioInput, SurveySelectInput } from "./inputs";
import { verifyTextInputType } from "./verifiers";


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
    const LOCALSTORAGE_KEY = "SurveyJSON"
    // this.handleSubmit = this.handleSubmit.bind(this);


    const handleSubmit = (event) => {
      event.preventDefault();
      event.persist();
    
    for (let formInput of event.target.elements) {
      const verifyType = verifyTextInputType(formInput.type);
      if (verifyType) {
        surveyValues[formInput.name] = formInput.value;
        question[formInput.question] = formInput.question;
      }

      if (formInput.type === "select-one") {
        surveyValues[formInput.name] = formInput.value;
        question[formInput.question] = formInput.question;
      }

      if (formInput.type === "select-multiple") {
        let selected = [].filter.call(
          formInput.options,
          (option) => option.selected
        );
        let values = selected.map((option) => option.value);

        surveyValues[formInput.name] = values;
        question[formInput.name] = formInput.question;
      }

      if (formInput.checked) {
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

  const validateSurvey = (json) => {
    let validSurvey
    try {
      validSurvey = JSON.stringify(JSON.parse(json), null, 2)}
       catch(e) {
      throw e
    }
    return validSurvey;
  }
  

  const loadSurvey = () => {
    const json = window.localStorage.getItem(LOCALSTORAGE_KEY) ||
    JSON.stringify(inlineData, null, 2)
    this.setState({ json})
  }

  const saveSurvey = (json) => {
    const validSurvey = validateSurvey(json)

    if (!validSurvey) return;

    window.localStorage.setItem(
      LOCALSTORAGE_KEY,
      validSurvey
    )
  }

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
              required={props.required}
              question={obj.question}
              key={inputKey}
            />
          ) : obj.type === "select" ? (
            <SurveySelectInput
              className="form-control mb-3 mt-3"
              question={obj.question}
              required={props.required}
              object={obj}
              key={inputKey}
              {...obj}
            />
          ) : (
            <SurveyTextInput
              className="mb-3 mt-3 form-control"
              type={obj.type}
              question={props.question}
              required={props.required}
              triggerCallback={callback}
              placeholder={obj.placeholder}
              defaultValue={obj.defaultValue}
              name={obj.name}
              key={inputKey}
              {...obj}
            />
          );
        })}

      {isFinalPage !== true ? (
        <button name="begin-btn" className="btn btn-primary my-5">
          Continue
        </button>
      ) : (
        <button onClick={saveSurvey} type="submit" className="btn btn-primary my-5">
          Submit
        </button>
      )}
    </form>
    
    )
      }



