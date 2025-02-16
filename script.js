// Custom Cursor Effect
document.addEventListener("mousemove", (e) => {
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
  document.body.appendChild(cursor);
  setTimeout(() => cursor.remove(), 500);
});

// Random Character Pop-Up
const characters = [
  { image: "https://i.pinimg.com/736x/db/b3/6f/dbb36f9c4627648afbe78a3c3367924f.jpg", text: "I’m here to remind you that you’re the strongest! Now go crush those exams!" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPomcqNXgXteBFG7E9YKPnzADdDlcrYd_wwg&s", text: "I don’t usually cheer for humans, but you’re an exception. Don’t disappoint me!" },
  { image: "https://image.cdn2.seaart.me/temp-convert-webp/highwebp/2024-02-02/cmu6ek5e878c73fngph0/6230d1b0ca21133699ea40ff214b68c442c06c36_low.webp", text: "If exams were curses, I’d nail them all in one go! You can too!" },
  { image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4cb7e4eb-c00d-423f-89ee-56cbb2874d5b/deohoe8-1ac2386d-4032-4241-9b9d-65b4f01eddb2.jpg/v1/fill/w_1280,h_1920,q_75,strp/megumi_fushiguro_by_shinigamimel_deohoe8-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcLzRjYjdlNGViLWMwMGQtNDIzZi04OWVlLTU2Y2JiMjg3NGQ1YlwvZGVvaG9lOC0xYWMyMzg2ZC00MDMyLTQyNDEtOWI5ZC02NWI0ZjAxZWRkYjIuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5Dd71hNkjpQcXh4cDQHPwhpGSNoUHI5gCI5RxlI3oVU", text: "Even my shikigami believe in you. You’ve got this!" },
];

function showRandomCharacter() {
  const randomChar = characters[Math.floor(Math.random() * characters.length)];
  const popup = document.getElementById("random-character");
  if (popup) {
    popup.innerHTML = `
      <img src="${randomChar.image}" alt="Random Character">
      <p>"${randomChar.text}"</p>
    `;
    popup.classList.remove("hidden");
    setTimeout(() => popup.classList.add("hidden"), 5000); // Hide after 5 seconds
  }
}

setInterval(showRandomCharacter, 15000); // Show every 10 seconds
// Game Variables
let score = 0;
let timeLeft = 30;
let gameInterval;
let curseInterval;
let level = 1;

// DOM Elements
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const whackSound = document.getElementById("whack-sound");
const bgMusic = document.getElementById("bg-music");

// Start Game
startButton.addEventListener("click", startGame);

function startGame() {
  score = 0;
  timeLeft = 30;
  level = 1;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  startButton.disabled = true;
  bgMusic.play();

  // Start timer
  gameInterval = setInterval(updateTimer, 1000);

  // Start spawning curses
  curseInterval = setInterval(spawnCurse, 1000 - level * 100); // Faster as level increases
}

// Spawn Curse
function spawnCurse() {
  const curse = document.createElement("img");
  curse.src = "https://i.sstatic.net/IEJVB.jpg"; // Replace with your curse image
  curse.className = "curse";
  curse.style.left = `${Math.random() * (gameArea.offsetWidth - 80)}px`;
  curse.style.top = `${Math.random() * (gameArea.offsetHeight - 80)}px`;
  curse.addEventListener("click", whackCurse);
  gameArea.appendChild(curse);

  // Remove curse after 2 seconds
  setTimeout(() => {
    if (curse.parentElement) {
      curse.remove();
    }
  }, 2000);
}

// Whack Curse
function whackCurse() {
  score++;
  scoreDisplay.textContent = score;
  whackSound.play();
  this.remove(); // Remove the curse when clicked
}

// Update Timer
function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

// End Game
function endGame() {
  clearInterval(gameInterval);
  clearInterval(curseInterval);
  bgMusic.pause();
  alert(`Game Over! Your final score is ${score}.`);
  startButton.disabled = false;
  gameArea.innerHTML = ""; // Clear curses
}

// Increase Difficulty
function increaseDifficulty() {
  level++;
  clearInterval(curseInterval);
  curseInterval = setInterval(spawnCurse, 1000 - level * 100); // Faster as level increases
}

