export const WINNING_COMBINATIONS = [
  [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
  ],
  [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ],
  [
    { row: 2, column: 0 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 0 },
    { row: 2, column: 0 },
  ],
  [
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 0 },
  ],
];

const checkPlayerWinner = (turns) => {
  let isWinner = false;
  WINNING_COMBINATIONS.forEach((combination) => {
    const [coord1, coord2, coord3] = combination;
    const selectedTurns = turns.filter((turn) => {
      return (
        (turn.square.row === coord1.row && turn.square.col === coord1.column) ||
        (turn.square.row === coord2.row && turn.square.col === coord2.column) ||
        (turn.square.row === coord3.row && turn.square.col === coord3.column)
      );
    });

    if (selectedTurns.length === 3) {
      isWinner = true;
      return;
    }
  });

  return isWinner;
};

export const checkWinningPlayer = (turns) => {
  const filterPlayerAndCheck = (symbol) => {
    const playerTurns = turns.filter((turn) => turn.player === symbol);
    const isPlayerWinner =
      playerTurns.length > 0 ? checkPlayerWinner(playerTurns) : false;

    return isPlayerWinner;
  };

  const isPlayerXWinner = filterPlayerAndCheck("X");

  if (isPlayerXWinner) {
    return "X";
  } else {
    const isPlayerOWinner = filterPlayerAndCheck("O");
    if (isPlayerOWinner) {
      return "O";
    }
  }

  return turns.length === 9 ? 'DRAW' : null;
};
