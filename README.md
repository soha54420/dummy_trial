# 🎮 Neon Grid: Tic Tac Toe & AI Explainer

<div align="center">
  <!-- Shields & Badges -->
  <img src="https://img.shields.io/badge/UX%2FUI-Premium%20Neon-cyan?style=for-the-badge&logo=css3" alt="UX Theme">
  <img src="https://img.shields.io/badge/AI%20Engine-Minimax-ff69b4?style=for-the-badge&logo=javascript" alt="AI Engine">
  <img src="https://img.shields.io/badge/Audio-Web%20Audio%20API-yellow?style=for-the-badge" alt="Audio API">
</div>

A premium, modern, and highly interactive **Tic Tac Toe Web Application** featuring a glassmorphic HSL dark-mode theme, synthesized retro sound effects, a score tracker, and a real-time **Interactive Engine Lab** explaining underlying computer science concepts.

> [!IMPORTANT]
> 🚀 **Play it Live**: Check out the deployed application on Vercel at **[dummy-trial.vercel.app](https://dummy-trial.vercel.app/)**.

### 🎮 Quick Start: How it Works
1. **Choose your game mode**: Play locally with a friend (PvP) or challenge the AI (Easy, Medium, or Impossible difficulty).
2. **Interact & Play**: Click a square to place your marker (`X` plays first, `O` follows).
3. **Sync with the Engine Lab**: Watch the sidebar update in real-time:
   * **Grid Mapping**: Displays the 3x3 layout mapped to a standard 1D array state in code.
   * **Win Checker**: Visualizes the 8 checks performed by the validator to determine a victor.
   * **Minimax Graph**: Inspects the evaluation scores calculated recursively by the AI decision tree.
4. **Hear Dynamic Synth Audio**: Sounds are generated programmatically on-the-fly using the native browser **Web Audio API** (no external file assets needed!).

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

### Running Locally
To serve the project locally using a web server:
1. Open your terminal in the project directory.
2. Launch a server:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser.

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
