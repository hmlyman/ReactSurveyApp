//import $ from "jquery";

export function isTextInput(inputType) {
  switch (inputType) {
    case "text":
      return true;
    case "email":
      return true;
    case "number":
      return true;
    case "textarea":
      return true;
    case "checkbox":
      return false;
    default:
      return false;
  }
}
