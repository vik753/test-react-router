import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect,
} from "react-router-dom";

import styles from "./app.module.scss";
import { HomePage, UserPostPage, AuthPage, AboutPage } from "./pages";
import { LogoutPage } from "./pages/LogoutPage";
import { Loader } from "./pages/LoaderPage/Loader";

export const App = () => {
  const { isAuth, isLoading, isAuthError } = useSelector(
    (store) => store.rootReducer
  );

  const routes = isAuth ? (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/logout" component={LogoutPage} />
      <Route path="/user/:userId&:userName" component={UserPostPage} />
      <Route path="*" render={() => <div>Error 404 Page not found.</div>} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Redirect to="/auth" />
    </Switch>
  );

  const navlinks = isAuth ? (
    <ul>
      <li>
        <NavLink to="/" activeClassName={styles.active} exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" activeClassName={styles.active}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/logout" activeClassName={styles.active}>
          Logout
        </NavLink>
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <NavLink to="/auth" activeClassName={styles.active}>
          Login
        </NavLink>
      </li>
    </ul>
  );

  return (
    <Router>
      <div>
        <div className={`${styles.res_container} ${styles.navbar}`}>
          {navlinks}
        </div>
        <Switch>{routes}</Switch>
      </div>
    </Router>
  );
};
