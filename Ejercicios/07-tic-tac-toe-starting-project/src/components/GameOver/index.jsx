const GameOver = ({ winner, onRestart }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winner !== 'DRAW' ? `${winner} won!` : "It's a Draw!"}</p>
      <p>
        <button type="button" onClick={onRestart}>
          Rematch!
        </button>
      </p>
    </div>
  );
};

export default GameOver;
