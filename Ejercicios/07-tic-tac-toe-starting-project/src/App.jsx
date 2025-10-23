import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { checkWinningPlayer } from "./data/check-winning-player";

function App() {
  const [players, setPlayers] = useState({
    X: {
      name: "Player 1",
      symbol: 'X'
    },
    O: {
      name: "Player 2",
      symbol: 'O'
    }
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer =
    gameTurns[0]?.player === players.X.symbol
      ? players.O.symbol
      : players.X.symbol;

  const playerWinner = checkWinningPlayer(gameTurns);

  const handleSelectSquare = (row, col) => {
    if (!playerWinner) {
      setGameTurns((oldStateTurns) => {
        const newTurn = [...oldStateTurns];
        newTurn.unshift({ square: { row, col }, player: activePlayer });

        return newTurn;
      });
    }
  };

  const handleRestartGameClickButton = () => {
    setGameTurns([]);
  };

  const onChangeNameHandler = (symbol, name) => {
    setPlayers((oldPlayersState) => {
      const currPlayer = oldPlayersState[symbol];

      return {
        ...oldPlayersState,
        [symbol]: {
          ...currPlayer,
          name
        }
      }
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName={players.X.name}
            symbol={players.X.symbol}
            isActive={activePlayer === players.X.symbol}
            onChangeName={onChangeNameHandler}
          />
          <Player
            playerName={players.O.name}
            symbol={players.O.symbol}
            isActive={activePlayer === players.O.symbol}
            onChangeName={onChangeNameHandler}
          />
        </ol>
        {playerWinner && (
          <GameOver
            winner={
              playerWinner !== "DRAW" ? players[playerWinner].name : playerWinner
            }
            onRestart={handleRestartGameClickButton}
          />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
