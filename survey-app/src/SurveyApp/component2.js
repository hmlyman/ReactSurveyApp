import React, {Component, useState } from "react";
import { SurveyTextInput, SurveyRadioInput, SurveySelectInput } from "./inputs";
import { verifyTextInputType } from "./verifiers";
import $ from "jquery";

class Survey extends Component{
  constructor(props){
    super(props)
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    handleSubmit(event) {
      event.preventDefault();
      event.persist();
    
    for (let formInput of event.target.elements) {
      let verifyType = verifyTextInputType(formInput.type);
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

      
    }}
    console.log(event);
    console.log(this);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: event,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

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
  ;
  
  callback = (name, value) => {
    console.log("callback", name, value);
    inlineData[name] = value;
    setInlineData(inlineData);
    console.log(inlineData);
  };
  }

  inputs = props.inputs
    ? props.inputs.filter((inputOption) => inputOption.page === page)
    : [];
    render() {
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
        <button type="submit" className="btn btn-primary my-5">
          Submit
        </button>
      )}
    </form>
    
  }
}

export default Survey;
