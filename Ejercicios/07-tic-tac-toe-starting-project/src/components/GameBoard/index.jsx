const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({ onSelectSquare, turns }) => {
  const gameBoard = JSON.parse(JSON.stringify(INITIAL_GAME_BOARD));

  turns.forEach((turn) => {
    const { square: { row, col }, player } = turn;
    gameBoard[row][col] = player;
  });

  const onClickFieldHandler = (row, col) => {
    if (!gameBoard[row][col]) {
      onSelectSquare(row, col);
    }
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={`row-${rowIndex}`}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={`row-${rowIndex}-col-${colIndex}`}>
                {
                  <button
                    type="button"
                    disabled={!!col}
                    onClick={() => onClickFieldHandler(rowIndex, colIndex)}
                  >
                    {col}
                  </button>
                }
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
