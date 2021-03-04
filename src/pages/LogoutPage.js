import {Redirect, useHistory} from "react-router-dom";
import { useEffect } from "react";
import { getLogout } from "../redux/sagaActions";
import { useDispatch } from "react-redux";
import {useLocalStorage} from "../helpers/helpers";

export const LogoutPage = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useLocalStorage('_auth_creds', null);
  const history = useHistory();

  useEffect(() => {
    const answer = window.confirm("Do you really want to Login Out?");
    if (answer) {
      setCredentials(null);
      dispatch(getLogout());
    }
    history.goBack();
  }, []);

  return <Redirect to="/auth" />;
};
