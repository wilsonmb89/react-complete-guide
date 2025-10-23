import React, { useState } from "react";

const Player = ({ playerName, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);

  const onClickButtonHandler = () => {
    setIsEditing((oldState) => !oldState);
  };

  const onChangeInputHandler = ({ target: { value } }) => {
    onChangeName(symbol, value);
  };

  const playerNameElement = isEditing ? (
    <input type="text" required value={playerName} onChange={onChangeInputHandler}/>
  ) : (
    <span className="player-name">{playerName}</span>
  );
  const buttonCaption = isEditing ? "Save" : "Edit";

  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {playerNameElement}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onClickButtonHandler}>{buttonCaption}</button>
    </li>
  );
};

export default Player;
