import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialSnakeLength = 10;
  const centerX = Math.floor(25 / 2);
  const centerY = Math.floor(40 / 2);
  const getBorderRadius = (direction) => {
    switch (direction) {
      case "right":
        return "0 50% 50% 0";
      case "left":
        return "50% 0 0 50%";
      case "down":
        return "0 0 50% 50%";
      case "up":
        return "50% 50% 0 0";
      default:
        return "50%";
    }
  };
  const getDirection = (snake) => {
    const head = snake[0];
    const prevHead = snake[1];

    if (prevHead[0] < head[0]) return "right";
    if (prevHead[0] > head[0]) return "left";
    if (prevHead[1] < head[1]) return "down";
    if (prevHead[1] > head[1]) return "up";
  };
  const [foodPosition, setFoodPosition] = useState([5, 5]);
  const [snake, setSnake] = useState(
    Array.from({ length: initialSnakeLength }, (_, index) => [
      centerX - index,
      centerY,
    ])
  );
  const [direction, setDirection] = useState([1, 0]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem("high-score")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const resetGame = () => {
    setSnake(
      Array.from({ length: initialSnakeLength }, (_, index) => [
        centerX - index,
        centerY,
      ])
    );
    setFoodPosition([
      Math.floor(Math.random() * 25) + 1,
      Math.floor(Math.random() * 40) + 1,
    ]);
    setDirection([1, 0]);
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const startGame = () => {
    resetGame();
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = [
        newSnake[0][0] + direction[0],
        newSnake[0][1] + direction[1],
      ];
      newSnake.unshift(head);

      if (head[0] === foodPosition[0] && head[1] === foodPosition[1]) {
        setScore((prevScore) => prevScore + 1);
        setFoodPosition([
          Math.floor(Math.random() * 25) + 1,
          Math.floor(Math.random() * 40) + 1,
        ]);
      } else {
        newSnake.pop();
      }

      if (
        head[0] <= 0 ||
        head[0] > 25 ||
        head[1] <= 0 ||
        head[1] > 40 ||
        newSnake
          .slice(1)
          .some((segment) => segment[0] === head[0] && segment[1] === head[1])
      ) {
        handleGameOver();
      } else {
        setSnake(newSnake);
      }

      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("high-score", score);
      }
    };

    const gameInterval = setInterval(moveSnake, 80);
    return () => clearInterval(gameInterval);
  }, [snake, direction, foodPosition, gameOver, score, highScore, gameStarted]);

  const handleKeyPress = (e) => {
    if (!gameStarted || gameOver) return;

    switch (e.key) {
      case "ArrowUp":
        if (direction[1] !== 1) setDirection([0, -1]);
        break;
      case "ArrowDown":
        if (direction[1] !== -1) setDirection([0, 1]);
        break;
      case "ArrowLeft":
        if (direction[0] !== 1) setDirection([-1, 0]);
        break;
      case "ArrowRight":
        if (direction[0] !== -1) setDirection([1, 0]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameStarted, gameOver]);

  const handleGameOver = () => {
    setGameOver(true);
    setDirection([0, 0]); // Stop the snake from moving
    setGameStarted(false); // Optionally, reset gameStarted to false to avoid issues
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="top__left__cc">
          <svg
            width={7}
            height={6}
            viewBox="0 0 7 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="257eb475"
              d="M0.460938 5.56574L5.99951 0.976349M0.460938 0.976349L5.99951 5.56574"
              stroke="#114944"
            />
          </svg>
        </div>
        <div className="top__right__cc">
          <svg
            width={7}
            height={6}
            viewBox="0 0 7 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="257eb475"
              d="M0.460938 5.56574L5.99951 0.976349M0.460938 0.976349L5.99951 5.56574"
              stroke="#114944"
            />
          </svg>
        </div>
        <div className="bottom__left__cc">
          <svg
            width={7}
            height={6}
            viewBox="0 0 7 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="257eb475"
              d="M0.460938 5.56574L5.99951 0.976349M0.460938 0.976349L5.99951 5.56574"
              stroke="#0A2F2E"
            />
          </svg>
        </div>
        <div className="bottom__right__cc">
          <svg
            width={7}
            height={6}
            viewBox="0 0 7 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="257eb475"
              d="M0.460938 5.56574L5.99951 0.976349M0.460938 0.976349L5.99951 5.56574"
              stroke="#163355"
            />
          </svg>
        </div>
        <div className="play-board">
          {!gameStarted && !gameOver && (
            <div className="overflow-status">
              <button onClick={startGame}>start-game</button>
            </div>
          )}
          {gameOver && (
            <div className="overflow-status-game-over">
              <h3>GAME OVER!</h3>
              <button onClick={startGame}>start-again</button>
            </div>
          )}
          <div
            className="food"
            style={{ gridArea: `${foodPosition[1]} / ${foodPosition[0]}` }}
          ></div>
          {snake.map((segment, index) => {
            const opacity = 1 - index / snake.length;
            const backgroundColor = `rgba(67, 217, 173, ${opacity})`;
            const direction = index === 0 ? getDirection(snake) : null;
            const borderRadius = direction ? getBorderRadius(direction) : "50%";
            return (
              <div
                key={index}
                className="snake-segment"
                style={{
                  gridArea: `${segment[1]} / ${segment[0]}`,
                  backgroundColor,
                  borderRadius: index === 0 ? borderRadius : "0",
                }}
              ></div>
            );
          })}
        </div>
        <div className="details">
          Score: {score} | High Score: {highScore}
        </div>
      </div>
    </div>
  );
}

export default App;
