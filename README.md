# 🎮 Neon Grid: Tic Tac Toe & AI Explainer

<div align="center">
  
  <!-- Animated SVG Header -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 240" width="100%" height="auto" style="background:#0b0d19; border-radius: 12px; font-family: 'Outfit', -apple-system, sans-serif;">
    <defs>
      <radialGradient id="glow1" cx="20%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#0b0d19" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="80%" cy="70%" r="50%">
        <stop offset="0%" stop-color="#f35588" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#0b0d19" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="#0b0d19"/>
    <rect width="100%" height="100%" fill="url(#glow1)"/>
    <rect width="100%" height="100%" fill="url(#glow2)"/>

    <style>
      @keyframes pulseGlow {
        0%, 100% { filter: drop-shadow(0 0 4px var(--glow)); opacity: 0.8; }
        50% { filter: drop-shadow(0 0 12px var(--glow)); opacity: 1; }
      }
      @keyframes drawLine {
        to { stroke-dashoffset: 0; }
      }
      .grid-line {
        stroke: #2b304c;
        stroke-width: 4;
        stroke-linecap: round;
        stroke-dasharray: 200;
        stroke-dashoffset: 200;
        animation: drawLine 1.2s ease-out forwards;
      }
      .line-1 { animation-delay: 0.1s; }
      .line-2 { animation-delay: 0.3s; }
      .line-3 { animation-delay: 0.5s; }
      .line-4 { animation-delay: 0.7s; }

      .marker-x {
        stroke: #00f2fe;
        --glow: #00f2fe;
        stroke-width: 8;
        stroke-linecap: round;
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        animation: drawLine 0.6s ease-out forwards, pulseGlow 2.5s infinite alternate;
      }
      .marker-o {
        stroke: #f35588;
        --glow: #f35588;
        stroke-width: 8;
        stroke-linecap: round;
        fill: none;
        stroke-dasharray: 150;
        stroke-dashoffset: 150;
        animation: drawLine 0.6s ease-out forwards, pulseGlow 2.5s infinite alternate;
      }
      .x-1 { animation-delay: 1.0s; }
      .x-2 { animation-delay: 1.2s; }
      .o-1 { animation-delay: 1.5s; }
      .o-2 { animation-delay: 1.7s; }

      .title-text {
        fill: #ffffff;
        font-size: 42px;
        font-weight: 800;
        letter-spacing: 3px;
        opacity: 0;
        animation: fadeIn 0.8s ease-out forwards 0.3s;
      }
      .subtitle-text {
        fill: #a0aec0;
        font-size: 15px;
        font-weight: 300;
        letter-spacing: 1px;
        opacity: 0;
        animation: fadeIn 0.8s ease-out forwards 0.7s;
      }
      .active-text {
        fill: #00f2fe;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 2px;
        opacity: 0;
        animation: fadeIn 0.8s ease-out forwards 2.0s;
      }
      @keyframes fadeIn {
        to { opacity: 1; }
      }
    </g>
    </style>

    <!-- Left: Animated Grid -->
    <g transform="translate(60, 25)">
      <!-- grid lines -->
      <line x1="70" y1="10" x2="70" y2="170" class="grid-line line-1"/>
      <line x1="130" y1="10" x2="130" y2="170" class="grid-line line-2"/>
      <line x1="10" y1="70" x2="190" y2="70" class="grid-line line-3"/>
      <line x1="10" y1="130" x2="190" y2="130" class="grid-line line-4"/>

      <!-- X at 0,0 -->
      <path d="M25,25 L55,55 M55,25 L25,55" class="marker-x x-1"/>
      <!-- O at 1,1 -->
      <circle cx="100" cy="100" r="16" class="marker-o o-1"/>
      <!-- X at 2,2 -->
      <path d="M145,145 L175,175 M175,145 L145,175" class="marker-x x-2"/>
      <!-- O at 0,2 -->
      <circle cx="160" cy="40" r="16" class="marker-o o-2"/>
    </g>

    <!-- Right: Animated Titles -->
    <text x="310" y="105" class="title-text">NEON GRID</text>
    <text x="310" y="135" class="subtitle-text">Tic-Tac-Toe &amp; Interactive AI Explainer</text>
    <text x="310" y="165" class="active-text">⚡ NATIVE WEB AUDIO &amp; MINIMAX Decision Engine</text>
  </svg>

  <p></p>

  <!-- Shields & Badges -->
  <img src="https://img.shields.io/badge/UX%2FUI-Premium%20Neon-cyan?style=for-the-badge&logo=css3" alt="UX Theme">
  <img src="https://img.shields.io/badge/AI%20Engine-Minimax-ff69b4?style=for-the-badge&logo=javascript" alt="AI Engine">
  <img src="https://img.shields.io/badge/Audio-Web%20Audio%20API-yellow?style=for-the-badge" alt="Audio API">
</div>

A premium, modern, and highly interactive **Tic Tac Toe Web Application** featuring a glassmorphic HSL dark-mode theme, synthesized retro sound effects, a score tracker, and a real-time **Interactive Engine Lab** explaining underlying computer science concepts.

---

## ✨ Features

- **Premium Visuals**: Glassmorphic UI overlays, ambient floating glow orbs, custom neon X (Cyan) and O (Pink) glowing markers, and responsive scaling.
- **Local PvP**: Smooth local hotseat multiplayer mode.
- **AI Opponents**:
  - 🟢 **Easy**: Plays random moves.
  - 🟡 **Medium**: Blocks immediate user wins and goes for instant winning spots.
  - 🔴 **Impossible**: Powered by a recursive **Minimax** algorithm that plays perfectly (will never lose).
- **Interactive Engine Lab**:
  - 📊 **Grid Mapping**: Watch the 3x3 visual board update a real-time 1D Javascript Array state.
  - 🏆 **Win Checker**: Hover over winning combinations to see how the engine loops through coordinates.
  - 🧠 **Minimax AI**: Play moves and see a bar chart comparing the AI's evaluations (+10 for AI win, -10 for Human win, 0 for Tie) for every legal cell index.
- **Dynamic Sound Synthesis**: Retro sound effects created dynamically via code using the **Web Audio API**—no external audio files or asset loading issues.

---

## 📂 Project Structure

```bash
Dummy/
├── index.html   # Main structure & layout of board, settings, and interactive lab
├── style.css    # Premium HSL dark-mode styles, neon lighting, and animations
├── script.js    # Core game loop, sound generators, minimax AI, and lab sync logic
└── README.md    # Repository guide and educational breakdown (this file)
```

---

## 🛠️ How It Works (Under the Hood)

> [!TIP]
> Click any section below to interactively expand the detailed programming logic and code snippets!

<details>
<summary>🔢 1. The 1D Board Array Mapping</summary>

### 1D Array Layout
To represent a 3x3 grid in Javascript simply, we map the coordinates to a 9-element 1D array:
```
 Visual Grid            1D Array Indices
  ┌───┬───┬───┐          
  │ X │   │ O │   ───►   [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
  ├───┼───┼───┤          
  │   │ X │   │          Values:
  ├───┼───┼───┤          "X", "O", or "" (empty)
  │   │   │   │          
  └───┴───┴───┘          
```
</details>

<details>
<summary>🏆 2. The Win Detector</summary>

### Win Conditions
Winning coordinates are hardcoded into an array of 8 lines (3 rows, 3 columns, 2 diagonals):
```javascript
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];
```
The win condition checks if any combo is fully populated by a single player:
```javascript
function checkWin(board, player) {
  return WINNING_COMBINATIONS.some(combo => 
    combo.every(idx => board[idx] === player)
  );
}
```
</details>

<details>
<summary>🧠 3. The Minimax Algorithm</summary>

### Decision Engine Flow
The **Impossible AI** uses a classic game theory algorithm called **Minimax**. When it is the AI's turn, it simulates *every possible move* recursively:
1. **AI Turn (Maximizer)**: Try a cell. Recursively compute the opponent's best response, and aim to maximize the final score.
2. **Player Turn (Minimizer)**: Simulate what the human will do. The human wants to minimize the AI's score.
3. **Terminal Evaluation**: 
   - AI Win = `+10` (minus depth to prefer faster wins)
   - Human Win = `-10` (plus depth to drag out losses)
   - Tie = `0`

```javascript
function runMinimax(tempBoard, depth, isMaximizing) {
  if (checkWin(tempBoard, 'O')) return 10 - depth;
  if (checkWin(tempBoard, 'X')) return depth - 10;
  if (checkTie(tempBoard)) return 0;

  const empties = getEmptyCellIndices(tempBoard);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let index of empties) {
      tempBoard[index] = 'O';
      let score = runMinimax(tempBoard, depth + 1, false);
      tempBoard[index] = '';
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let index of empties) {
      tempBoard[index] = 'X';
      let score = runMinimax(tempBoard, depth + 1, true);
      tempBoard[index] = '';
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}
```
</details>

---

## 🚀 How to Run Locally

Since this project uses native web elements, vanilla CSS, and the Web Audio API, **no build systems or local installations are required!**

### Option A: Direct File Launch
1. Open the directory `C:\Users\Soha\OneDrive\Documents\worksh\Dummy`
2. Double-click `index.html` to open it directly in any modern web browser.

### Option B: Local Web Server
If you want hot-reloading or local testing, launch a server:
```powershell
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 📝 GitHub Deployment

To initialize and deploy this project to GitHub Pages:

1. Open your terminal inside this workspace directory.
2. Initialize and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Neon Grid Tic-Tac-Toe & AI Explainer"
   ```
3. Create a repository on GitHub, then link and push:
   ```bash
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
4. Turn on **GitHub Pages** in your repo Settings -> Pages to deploy the game live for free!
