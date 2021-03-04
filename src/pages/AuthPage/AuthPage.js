import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./authPage.module.scss";
import { getAuth } from "../../redux/sagaActions";
import { useLocalStorage, validateAuth } from "../../helpers/helpers";
import { Loader } from "../LoaderPage/Loader";

export const AuthPage = () => {
  const { isAuth, isLoading, isAuthError } = useSelector(
    (store) => store.rootReducer
  );
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [isCredsValid, setCredsValid] = useState({
    login: false,
    password: false,
  });
  const [savedCredentials, saveCredentials] = useLocalStorage(
    "_auth_creds",
    null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (savedCredentials) {
      dispatch(getAuth(savedCredentials));
    }
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAuth(loginData));
    setLoginData({ login: "", password: "" });
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((state) => ({
      ...state,
      [name]: value,
    }));
    const isValid = validateAuth(name, value);
    setCredsValid((prev) => ({ ...prev, [name]: isValid }));
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.my_container}>
      <form onSubmit={onSubmitHandler} className={styles.authForm}>
        <input
          type="text"
          name="login"
          value={loginData.login}
          onChange={inputChangeHandler}
          placeholder="Login"
          className={`${styles.authInputs} ${
            !isCredsValid.login && styles.authInputs_error
          }`}
          required
        />
        <span className={styles.input_tip}>
          Login can't start with numbers and must be at least 6 characters long.
        </span>
        <input
          type="text"
          name="password"
          value={loginData.password}
          onChange={inputChangeHandler}
          placeholder="Password"
          className={`${styles.authInputs} ${
            !isCredsValid.password && styles.authInputs_error
          }`}
          required
        />
        <span className={styles.input_tip}>
          Password must be at least 8 symbols long and has at least one
          Uppercase symbol and has at least one number.
        </span>

        {isAuthError && (
          <div className={styles.login_error}>
            Your login or password is incorrect! Try again please.
          </div>
        )}
        <button
          type="submit"
          className={styles.authSubmitBtn}
          disabled={!isCredsValid.login || !isCredsValid.password}
        >
          Login
        </button>
      </form>
    </div>
  );
};
