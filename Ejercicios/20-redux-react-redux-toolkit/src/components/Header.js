import { useDispatch } from "react-redux";

import { logout } from "../store/user-profile-store";
import { reset } from "../store/counter-store";

import classes from "./Header.module.css";

const Header = ({ isLogged }) => {
  const dispatch = useDispatch();

  const onLogoutButtonClickHandler = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isLogged && (
        <nav>
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>

            <li>
              <button onClick={onLogoutButtonClickHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
