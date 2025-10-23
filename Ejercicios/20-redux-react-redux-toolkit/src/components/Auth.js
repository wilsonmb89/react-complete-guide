import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./Auth.module.css";
import { login } from "../store/user-profile-store";

const Auth = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const onSubmitLoginFormHandler = (event) => {
    event.preventDefault();

    dispatch(login({ ...loginForm }));
  };

  const onChangeFormInput = (event) => {
    const {
      target: { name, value },
    } = event;

    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={onSubmitLoginFormHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={onChangeFormInput}
              value={loginForm.email}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={onChangeFormInput}
              value={loginForm.password}
              required
            />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
