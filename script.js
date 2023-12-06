const mainMenu = document.getElementById("main-menu");
const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const speedSelect = document.getElementById("speed");

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = "right";
let score = 0;
let highScore = 0;
let gameInterval;

function startGame() {
  mainMenu.style.display = "none";
  gameBoard.style.display = "block";

  speed = parseInt(speedSelect.value);

  gameInterval = setInterval(() => {
    move();
    draw();
    checkCollision();
  }, speed);

  document.addEventListener("keydown", handleKeyPress);
}

function draw() {
  gameBoard.innerHTML = "";

  // Draw Snake
  snake.forEach(segment => {
    const snakeElement = document.createElement("div");
    snakeElement.className = "snake";
    snakeElement.style.left = segment.x * 20 + "px";
    snakeElement.style.top = segment.y * 20 + "px";
    gameBoard.appendChild(snakeElement);
  });

  // Draw Food
  const foodElement = document.createElement("div");
  foodElement.className = "food";
  foodElement.style.left = food.x * 20 + "px";
  foodElement.style.top = food.y * 20 + "px";
  gameBoard.appendChild(foodElement);

  // Update Score
  scoreElement.textContent = score;
  highScoreElement.textContent = highScore;
}

function move() {
  const head = { ...snake[0] };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }

  // Update High Score
  if (score > highScore) {
    highScore = score;
  }
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * 15),
    y: Math.floor(Math.random() * 15)
  };
}

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
}

function checkCollision() {
  const head = snake[0];

  // Check if snake hits the walls or itself
  if (
    head.x < 0 ||
    head.x >= 15 ||
    head.y < 0 ||
    head.y >= 15 ||
    collisionWithItself()
  ) {
    endGame();
  }
}

function collisionWithItself() {
  const head = snake[0];
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

function endGame() {
  clearInterval(gameInterval);
  alert("Game Over!");
  resetGame();
}

function resetGame() {
  mainMenu.style.display = "flex";
  gameBoard.style.display = "none";
  snake = [{ x: 10, y: 10 }];
  food = { x: 5, y: 5 };
  direction = "right";
  score = 0;
  draw();
}
