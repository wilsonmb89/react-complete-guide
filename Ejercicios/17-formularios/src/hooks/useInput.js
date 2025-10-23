import { useState } from "react";

export const useInput = (defaultValue, validationFn = []) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn.reduce(
    (acc, currFunction) => acc && currFunction(enteredValue),
    true
  );

  const onBlurInputHandler = () => {
    setDidEdit(true);
  };

  const onChangeValueHandler = (value) => {
    setEnteredValue(value);
    setDidEdit(false);
  };

  return {
    value: enteredValue,
    hasError: didEdit && !valueIsValid,
    onBlurInputHandler,
    onChangeValueHandler,
  };
};
