const checkValidity = (value, validation) => {
  let isValid = true;
  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }
  if (validation.maxLength) {
    isValid = value.length <= validation.maxLength && isValid;
  }
  if (validation.state) {
    isValid = value.length === 2 && isValid;
  }
  if (validation.fullName) {
    if (value.split(" ").length >= 2 && value.split(" ")[1].trim() !== "") {
      isValid = true;
    } else {
      isValid = false;
    }
  }
  return isValid;
};

export default checkValidity;
