import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import {getUsers, setIsGetDataError} from "../../redux/sagaActions";
import { Loader } from "../LoaderPage/Loader";
import { UserCard } from "./UserCard/UserCard";
import mainStyles from "../../app.module.scss";
import styles from "./homePage.module.scss";

export const HomePage = () => {
  const { isAuth, isLoading, isGetDataError, users } = useSelector(
    (store) => store.rootReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!users || !users.length) {
      dispatch(getUsers());
    }
    return () => {
      dispatch(setIsGetDataError(false));
    };
  }, [dispatch, users]);

  if (isGetDataError) {
    return <div>Error. Can't get data.</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  const usersList =
    users && users.length ? (
      users.map((user) => {
        if (!user.id) return null;

        return <UserCard key={user.id} user={user} />;
      })
    ) : (
      <div>No users yet...</div>
    );

  console.log(users);
  return (
    <div className={`${mainStyles.res_container} ${styles.card_container}`}>
      {usersList}
    </div>
  );
};
