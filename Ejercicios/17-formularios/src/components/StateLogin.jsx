import Input from "./Input";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function Login() {
  const {
    value: emailValue,
    hasError: emailHasError,
    onBlurInputHandler: emailOnBlurInputHandler,
    onChangeValueHandler: emailOnChangeValueHandler,
  } = useInput("", [isEmail, isNotEmpty]);

  const {
    value: passwordValue,
    hasError: passwordHasError,
    onBlurInputHandler: passwordOnBlurInputHandler,
    onChangeValueHandler: passwordOnChangeValueHandler,
  } = useInput("", [hasMinLength]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    emailOnBlurInputHandler();
    passwordOnBlurInputHandler();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          value={emailValue}
          onBlur={emailOnBlurInputHandler}
          onChange={(event) => emailOnChangeValueHandler(event.target.value)}
          error={emailHasError ? "Please enter a valid email address." : ""}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          value={passwordValue}
          onBlur={passwordOnBlurInputHandler}
          onChange={(event) => passwordOnChangeValueHandler(event.target.value)}
          error={passwordHasError ? "Please enter a valid password." : ""}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
