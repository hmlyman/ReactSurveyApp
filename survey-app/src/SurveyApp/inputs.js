import React from "react";
import { isTextInput } from "./verifiers";
import { useInputChange } from "./hooks";

export const SurveySelectInput = (props) => {
  const { object } = props;
  const inputType = isTextInput(props.type) ? props.type : "select";
  const { value, handleChange } = useInputChange(
    props.defaultValue,
    props.triggerCallback,
    inputType
  );

  const inputProps = {
    className: props.className ? props.className : "form-control",
    onChange: handleChange,
    value: value,
    required: props.required,
    question: props.question,
    type: inputType,
    name: props.name ? props.name : `${inputType}_${props.key}`,
  };
  return (
    <>
      <div id={object.name}>
        <h5>{props.question}</h5>
        <select
          {...inputProps}
          name={object.name}
          className={props.className}
          multiple={object.multiple}
        >
          <option hidden value>
            Select one
          </option>
          {object.options.map((data, index) => {
            return (
              <option
                value={data.value}
                id={`${object.name}-${index}`}
                key={`${object.type}-${index}`}
                className={`form-check ${props.optionClassName}`}
              >
                {data.label}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};
export const SurveySelectMultipleInput = (props) => {
  const { object } = props;
  const { value, handleChange } = useInputChange(
    props.value,
    props.triggerCallback
  );
  const inputType = isTextInput(props.type) ? props.type : "";
  const inputProps = {
    className: props.className ? props.className : "form-control",
    onChange: handleChange,
    value: value,
    required: props.required,
    question: props.question,
    type: inputType,
    name: props.name ? props.name : `${inputType}_${props.key}`,
  };
  console.log(value);
  return (
    <>
      <div id={object.name}>
        <h5>{props.question}</h5>
        <select
          {...inputProps}
          name={object.name}
          className={props.className}
          multiple={object.multiple}
        >
          <option hidden value>
            Select one
          </option>
          {object.options.map((data, index) => {
            return (
              <option
                value={data.value}
                id={`${object.name}-${index}`}
                key={`${object.type}-${index}`}
                className={`form-check ${props.optionClassName}`}
              >
                {data.label}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export const SurveyRadioInput = (props) => {
  const { object, question } = props;
  const { value, handleChange } = useInputChange(
    props.defaultValue,
    props.triggerCallback
  );
  const inputType = isTextInput(props.type) ? props.type : "";
  const inputProps = {
    className: props.className ? props.className : "form-control",
    onChange: handleChange,
    value: value,
    required: props.required,
    question: props.question,
    type: inputType,
    name: props.name ? props.name : `${inputType}_${props.key}`,
  };
  return (
    <div id={object.name}>
      <div className={`form-check ${props.className}`}>
        <h5 className="radio-inline control-label ">{question}</h5>
        {object.options.map((data, index) => {
          return (
            <div key={`${object.type}-${index}`}>
              <input
                {...inputProps}
                className="form-check-input "
                required={object.required}
                type={object.type}
                value={data.value}
                name={object.name}
                id={`${object.name}-${index}`}
              />
              <label
                className="radio-inline control-label "
                htmlFor={`${object.name}-${index}`}
              >
                {data.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SurveyCheckboxInput = (props) => {
  const { object, question } = props;
  const { value, handleChange } = useInputChange(
    props.value,
    props.triggerCallback
  );
  const inputType = isTextInput(props.type) ? props.type : "checkbox";
  const inputProps = {
    className: props.className ? props.className : "form-control",
    onChange: handleChange,
    value: value,
    required: props.required,
    question: props.question,
    type: inputType,
    checked: false,
    name: props.name ? props.name : `${inputType}_${props.key}`,
  };

  return (
    <div id={object.name}>
      <div className={`form-check  ${props.className}`}>
        <h5>{question}</h5>
        {object.options.map((data, index) => {
          return (
            <div key={`${object.type}-${index}`}>
              <input
                {...inputProps}
                className="form-check-input "
                required={object.required}
                type={object.type}
                value={data.value}
                name={object.name}
                id={`${object.name}-${index}`}
              />
              <label
                className="form-check-label "
                htmlFor={`${object.name}-${index}`}
              >
                {data.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SurveyTextInput = (props) => {
  const { value, handleChange } = useInputChange(
    props.defaultValue,
    props.triggerCallback
  );
  const inputType = isTextInput(props.type) ? props.type : "text";
  const inputProps = {
    className: props.className ? props.className : "form-control",
    onChange: handleChange,
    value: value,
    required: props.required,
    question: props.question,
    type: inputType,
    placeholder: props.placeholder ? props.placeholder : "Your text...",
    name: props.name ? props.name : `${inputType}_${props.key}`,
  };
  return inputType === "textarea" ? (
    <>
      <h5>{props.question}</h5>
      <textarea {...inputProps} />
    </>
  ) : (
    <>
      <h5>{props.question}</h5>
      <input {...inputProps} />
    </>
  );
};
