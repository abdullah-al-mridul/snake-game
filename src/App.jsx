import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import GameStart from "./mp3/game-start.mp3";
import EatSound from "./mp3/eat-sound.mp3";
import Success from "./mp3/success.mp3";
import Failed from "./mp3/failed.mp3";
function App() {
  const initialSnakeLength = 10;
  const [foodsEaten, setFoodsEaten] = useState(0);
  const centerX = Math.floor(25 / 2);
  const centerY = Math.floor(40 / 2);
  const foods = Array.from({ length: 10 }, (_, idx) => {
    return idx >= 10 - foodsEaten ? (
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className={"eated-food"}
      ></motion.div>
    ) : (
      <div key={idx}></div>
    );
  });

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
    setFoodsEaten(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const startGame = () => {
    resetGame();
    GameStartRef.current.play();
  };

  useEffect(() => {
    if (!gameStarted || gameOver || foodsEaten >= 10) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = [
        newSnake[0][0] + direction[0],
        newSnake[0][1] + direction[1],
      ];

      newSnake.unshift(head);

      if (head[0] === foodPosition[0] && head[1] === foodPosition[1]) {
        EatSoundRef.current.play();
        setFoodPosition([
          Math.floor(Math.random() * 25) + 1,
          Math.floor(Math.random() * 40) + 1,
        ]);
        setFoodsEaten((prevFoodsEaten) => prevFoodsEaten + 1);
        if (foodsEaten >= 10) {
          setGameOver(true);
          setGameStarted(false);
          SuccessRef.current, play();
          return;
        }
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
    };

    const gameInterval = setInterval(moveSnake, 100);

    return () => clearInterval(gameInterval);
  }, [snake, direction, foodPosition, gameOver, gameStarted]);

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
    FailedRef.current.play();
    setDirection([0, 0]);
    setGameStarted(false);
  };

  const GameStartRef = useRef(null);

  const EatSoundRef = useRef(null);

  const FailedRef = useRef(null);

  const SuccessRef = useRef(null);

  useEffect(() => {
    console.log(
      "%c Abdullah Al Mridul ",
      "color: #43D9AD; background-color: #011627; font-size:24px",
      "Here is my details!"
    );
    console.group("User Details");
    console.log("name: Abdullah Al Mridul");
    console.log("position: Web Developer / Programmer");
    console.log("age: 16");
    console.groupEnd();
  }, []);
  return (
    <div className="container">
      <p className="copyright-text">
        Snake Game Developed by Abdullah |{" "}
        <a href="https://github.com/abdullah-al-mridul" target="_blank">
          Github
        </a>{" "}
        |{" "}
        <a
          href="https://www.facebook.com/abdullah.al.mridul.dev"
          target="_blank"
        >
          Facebook
        </a>
      </p>
      <audio
        src={EatSound}
        ref={EatSoundRef}
        style={{
          display: "none",
        }}
      ></audio>
      <audio
        src={Success}
        ref={SuccessRef}
        style={{
          display: "none",
        }}
      ></audio>
      <audio
        src={Failed}
        ref={FailedRef}
        style={{
          display: "none",
        }}
      ></audio>
      <audio
        src={GameStart}
        ref={GameStartRef}
        style={{
          display: "none",
        }}
      ></audio>
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
          <AnimatePresence>
            {!gameStarted && !gameOver && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="overflow-status"
              >
                <button onClick={startGame}>start-game</button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {(gameOver || foodsEaten >= 10) && (
              <motion.div
                className="overflow-status-game-over"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <h3>{foodsEaten >= 10 ? "WELL DONE!" : "GAME OVER!"}</h3>
                <button onClick={startGame}>play-again</button>
              </motion.div>
            )}
          </AnimatePresence>
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
          <div className="help-sec">
            <p>{"// use keyboard"}</p>
            <p>{"// arrows to play"}</p>
            <div className="arrows-cont">
              <div className="arrow-left">
                <svg
                  width={7}
                  height={10}
                  viewBox="0 0 7 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="0efe9440"
                    d="M0.0390623 4.80914L6.03906 0.559128L6.03906 9.05916L0.0390623 4.80914Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="arrow-center">
                <div>
                  <svg
                    width={9}
                    height={7}
                    viewBox="0 0 9 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="7f89fa5d"
                      d="M4.50002 0.309143L8.75003 6.30914H0.25L4.50002 0.309143Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    width={9}
                    height={7}
                    viewBox="0 0 9 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="69f978c8"
                      d="M4.49998 6.80914L0.24997 0.809142L8.75 0.809143L4.49998 6.80914Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div className="arrow-right">
                <svg
                  width={7}
                  height={10}
                  viewBox="0 0 7 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="abfa0d0f"
                    d="M6.96045 4.80914L0.960449 9.05916L0.960449 0.559128L6.96045 4.80914Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className=" food-list">
            <p>{"// food left"}</p>
            <div className="foods">
              <AnimatePresence>{foods}</AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
