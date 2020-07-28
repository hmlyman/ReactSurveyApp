import React from "react";
import { verifyTextInputType } from "./verifiers";
import { useInputChange } from "./hooks";

export const SurveySelectInput = (props) => {
  const { object } = props;

  return (
    <select
      name={object.name}
      question={props.question}
      className={props.className}
      multiple={object.multiple}
    >
      <option hidden value>
        Select one
      </option>
      {object.options.map((data, index) => {
        return (
          <option
            question={props.question}
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
  );
};

export const SurveyRadioInput = (props) => {
  const { object } = props;
  return (
    <div className={`form-check ${props.className}`}>
      {object.options.map((data, index) => {
        return (
          <div key={`${object.type}-${index}`}>
            <input
              question={props.question}
              className="form-check-input"
              type={object.type}
              value={data.value}
              name={object.name}
              id={`${object.name}-${index}`}
            />
            <label
              className="form-check-label"
              htmlFor={`${object.name}-${index}`}
            >
              {data.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export const SurveyTextInput = (props) => {
  const { value, handleChange } = useInputChange(
    props.defaultValue,
    props.triggerCallback
  );
  const inputType = verifyTextInputType(props.type) ? props.type : "text";
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
    <textarea {...inputProps} />
  ) : (
    <input {...inputProps} />
  );
};
