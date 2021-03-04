import { useState } from "react";
import validator from "validator";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      let data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : initialValue;
    } catch (err) {
      console.log('useLocalStorage Error:', err);
      return initialValue;
    }
  });
  const setValueToLocalStorage = (data) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
      setValue(data);
    } catch(err) {
      console.log('setValueToLocalStorage', err);
    }
  }
  return [value, setValueToLocalStorage];
};

export const validateAuth = (name, value) => {
  let isValid = false;
  if (name === "login") {
    // minLength 6 symbols and 3 first symbols can't be a numbers
    isValid =
      validator.isLength(value, { min: 5 }) &&
      validator.isAlpha(value.slice(0, 3));
  } else if (name === "password") {
    isValid = validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    });
  }
  return isValid;
};