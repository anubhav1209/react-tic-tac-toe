import React, { useState } from "react";
import './App.css';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Track whose turn it is (X or O)
  const [winner, setWinner] = useState(null); // Store the winner ('X', 'O', or null)

  // Check for winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Handle square click
  const handleClick = (index) => {
    if (squares[index] || winner) return; // Ignore click if square is filled or there is a winner
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
    setWinner(calculateWinner(newSquares));
  };

  // Reset the game
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  // Render square components
  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {squares[index]}
      </button>
    );
  };

  return (
    <div className="game">
      <h1>TIC-TAC-TOE</h1>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div>
          {winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`}
        </div>
        {/* Reset Button */}
        <button className="reset-button" onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}

export default App;
