import { useState, useRef } from "react"; 

export default function Player() {

  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputRef = useRef(null);

  // const changeInputPlayerNameHandler = ({target: { value }}) => {
  const changeInputPlayerNameHandler = () => {
    setSubmitted(false);
    // setPlayerName(value);
  };

  const onClickSubmitButtonHandler = () => {
    const value = inputRef.current.value;
    setPlayerName(value);
    setSubmitted(true);
    inputRef.current.value = '';
  };

  return (
    <section id="player">
      <h2>Welcome {submitted ? playerName : 'unknown entity'}</h2>
      <p>
        {/* <input value={playerName} onChange={changeInputPlayerNameHandler} type="text" /> */}
        <input ref={inputRef} onChange={changeInputPlayerNameHandler} type="text" />
        <button onClick={onClickSubmitButtonHandler}>Set Name</button>
      </p>
    </section>
  );
}
