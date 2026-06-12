/**
 * QUANTUM TIC-TAC-TOE & AI EXPLAINER
 * Core Game Logic, Minimax Decision Engine, Web Audio Synth, and Lab Visualizations
 */

// --- 1. Sound Synthesis Engine (Web Audio API) ---
class SoundSynth {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playMoveX() {
    if (!this.enabled) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime); // A4
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12); // A5
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playMoveO() {
    if (!this.enabled) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(554.37, this.ctx.currentTime); // C#5
    osc.frequency.exponentialRampToValueAtTime(329.63, this.ctx.currentTime + 0.15); // E4
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.03);
      gain.gain.linearRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.3);
    });
  }

  playDraw() {
    if (!this.enabled) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.4);
    
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }
}

const sound = new SoundSynth();

// --- 2. Game State Variables ---
let board = Array(9).fill('');
let currentPlayer = 'X'; // X always plays first
let isGameActive = true;
let gameMode = 'ai'; // 'pvp' or 'ai'
let difficulty = 'impossible'; // 'easy', 'medium', 'impossible'
let scores = { X: 0, O: 0, Ties: 0 };

try {
  const savedScores = localStorage.getItem('neonGridScores');
  if (savedScores) {
    scores = JSON.parse(savedScores);
  }
} catch (e) {
  console.warn("Could not load scores from localStorage:", e);
}

function saveScores() {
  try {
    localStorage.setItem('neonGridScores', JSON.stringify(scores));
  } catch (e) {
    console.warn("Could not save scores to localStorage:", e);
  }
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows: 0, 1, 2
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns: 3, 4, 5
  [0, 4, 8], [2, 4, 6]             // Diagonals: 6, 7
];

// --- 3. DOM Elements ---
const cells = document.querySelectorAll('.cell');
const boardElement = document.getElementById('board');
const winningLine = document.getElementById('winningLine');
const gameModeSelect = document.getElementById('gameMode');
const difficultySelect = document.getElementById('difficulty');
const difficultyGroup = document.getElementById('difficultyGroup');
const resetBoardBtn = document.getElementById('resetBoardBtn');
const resetScoresBtn = document.getElementById('resetScoresBtn');
const soundToggleBtn = document.getElementById('soundToggleBtn');

const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreTies = document.getElementById('scoreTies');
const scoreCardX = document.getElementById('scoreCardX');
const scoreCardO = document.getElementById('scoreCardO');
const playerOLabel = document.getElementById('playerOLabel');

// Explainer Elements
const codeArrayDisplay = document.getElementById('codeArrayDisplay');
const miniCells = document.querySelectorAll('.mini-cell');
const comboBadges = document.querySelectorAll('.combo-badge');
const aiDecisionText = document.getElementById('aiDecisionText');
const scoreBarChart = document.getElementById('scoreBarChart');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// --- 4. Event Listeners ---
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
  cell.addEventListener('mouseenter', handleCellHoverEnter);
  cell.addEventListener('mouseleave', handleCellHoverLeave);
});

gameModeSelect.addEventListener('change', (e) => {
  gameMode = e.target.value;
  sound.playClick();
  if (gameMode === 'pvp') {
    difficultyGroup.style.display = 'none';
    playerOLabel.innerHTML = '<i class="fa-solid fa-o"></i> PLAYER O';
  } else {
    difficultyGroup.style.display = 'flex';
    playerOLabel.innerHTML = '<i class="fa-solid fa-robot"></i> COMPUTER O';
  }
  resetGame();
});

difficultySelect.addEventListener('change', (e) => {
  difficulty = e.target.value;
  sound.playClick();
  resetGame();
});

resetBoardBtn.addEventListener('click', () => {
  sound.playClick();
  resetGame();
});

resetScoresBtn.addEventListener('click', () => {
  sound.playClick();
  scores = { X: 0, O: 0, Ties: 0 };
  saveScores();
  updateScoreboard();
});

soundToggleBtn.addEventListener('click', () => {
  sound.enabled = !sound.enabled;
  const icon = soundToggleBtn.querySelector('i');
  if (sound.enabled) {
    icon.className = 'fa-solid fa-volume-high';
    sound.playClick();
  } else {
    icon.className = 'fa-solid fa-volume-xmark';
  }
});

// Tab Toggles
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sound.playClick();
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Win Combinations badge hovers to show line
comboBadges.forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    const combo = badge.dataset.combo.split(',').map(Number);
    highlightWinningCombination(combo, true);
  });
  badge.addEventListener('mouseleave', () => {
    clearComboHighlight();
  });
});

// --- 5. Interactive Visualizations Helpers ---

function updateArrayCodeDisplay() {
  // Render format: ["", "X", "", "O", ...] with colored letters
  const elements = board.map(val => {
    if (val === 'X') return `<span style="color: var(--color-x); font-weight: 800;">"X"</span>`;
    if (val === 'O') return `<span style="color: var(--color-o); font-weight: 800;">"O"</span>`;
    return `""`;
  });
  codeArrayDisplay.innerHTML = `gameState = [\n  ${elements.join(', ')}\n]`;

  // Update mini cells too
  miniCells.forEach((mCell, idx) => {
    mCell.className = 'mini-cell';
    if (board[idx] === 'X') {
      mCell.classList.add('x-marker');
      mCell.innerText = 'X';
    } else if (board[idx] === 'O') {
      mCell.classList.add('o-marker');
      mCell.innerText = 'O';
    } else {
      mCell.innerText = idx;
    }
  });
}

function handleCellHoverEnter(e) {
  const index = e.target.dataset.index;
  const targetMini = document.querySelector(`.mini-cell[data-mini="${index}"]`);
  if (targetMini && !board[index]) {
    targetMini.classList.add('highlight');
  }
}

function handleCellHoverLeave(e) {
  const index = e.target.dataset.index;
  const targetMini = document.querySelector(`.mini-cell[data-mini="${index}"]`);
  if (targetMini) {
    targetMini.classList.remove('highlight');
  }
}

// Temporary show lines for win combinations badges
function highlightWinningCombination(combo, isDemo = false) {
  // Find which combination it represents (0-7)
  const comboIndex = WINNING_COMBINATIONS.findIndex(c => 
    c[0] === combo[0] && c[1] === combo[1] && c[2] === combo[2]
  );
  
  if (comboIndex === -1) return;

  winningLine.style.opacity = '1';
  winningLine.style.transform = 'scale(0)'; // Reset

  // Math offsets for 3x3 layout
  if (comboIndex <= 2) {
    // Horizontal row win
    const r = comboIndex;
    winningLine.style.top = `calc(${r * 33.33 + 16.66}% - 3px)`;
    winningLine.style.left = '8%';
    winningLine.style.width = '84%';
    winningLine.style.height = '6px';
    winningLine.style.transformOrigin = 'left center';
    winningLine.style.transform = 'scaleX(1)';
  } else if (comboIndex <= 5) {
    // Vertical column win
    const c = comboIndex - 3;
    winningLine.style.left = `calc(${c * 33.33 + 16.66}% - 3px)`;
    winningLine.style.top = '8%';
    winningLine.style.width = '6px';
    winningLine.style.height = '84%';
    winningLine.style.transformOrigin = 'center top';
    winningLine.style.transform = 'scaleY(1)';
  } else if (comboIndex === 6) {
    // Diagonal top-left to bottom-right
    winningLine.style.top = '8%';
    winningLine.style.left = '8%';
    winningLine.style.width = '6px';
    winningLine.style.height = '118%';
    winningLine.style.transformOrigin = 'top left';
    winningLine.style.transform = 'rotate(-45deg) scaleY(1)';
  } else if (comboIndex === 7) {
    // Diagonal top-right to bottom-left
    winningLine.style.top = '8%';
    winningLine.style.right = '8%';
    winningLine.style.width = '6px';
    winningLine.style.height = '118%';
    winningLine.style.transformOrigin = 'top right';
    winningLine.style.transform = 'rotate(45deg) scaleY(1)';
  }

  if (isDemo) {
    winningLine.style.background = 'var(--color-accent)';
  } else {
    winningLine.style.background = 'linear-gradient(90deg, var(--color-x), var(--color-accent), var(--color-o))';
  }
}

function clearComboHighlight() {
  if (isGameActive) {
    winningLine.style.opacity = '0';
    winningLine.style.transform = 'scale(0)';
  }
}

// Visual explanation of AI Minimax Decisions
function visualizeMinimaxCalculation(scoresArray) {
  if (scoresArray.length === 0) {
    aiDecisionText.innerText = "No moves calculated. Game is complete.";
    scoreBarChart.innerHTML = "";
    return;
  }

  aiDecisionText.innerHTML = `AI processed state tree. Evaluating all <strong>${scoresArray.length}</strong> available options:<br>` +
    `Best Score found: <span style="color: var(--color-o); font-weight: 800;">${Math.max(...scoresArray.map(s => s.score))}</span> (Higher is better for AI).`;

  scoreBarChart.innerHTML = "";
  
  scoresArray.forEach(item => {
    const bar = document.createElement('div');
    bar.className = 'score-bar';
    
    // Normalize percentage for visual bar length
    // Minimax scores: Win = +10, Tie = 0, Loss = -10.
    // Shift -10..+10 range to 10%..100%
    const normalizedPercent = ((item.score + 10) / 20) * 80 + 20; 
    
    let typeClass = 'tie';
    if (item.score > 0) typeClass = 'win';
    if (item.score < 0) typeClass = 'loss';
    
    bar.innerHTML = `
      <div class="bar-label">Cell ${item.index}</div>
      <div class="bar-track">
        <div class="bar-fill ${typeClass}" style="width: ${normalizedPercent}%"></div>
      </div>
      <div class="bar-val ${typeClass}">${item.score > 0 ? '+' : ''}${item.score}</div>
    `;
    scoreBarChart.appendChild(bar);
  });
}

// --- 6. Core Tic-Tac-Toe Game Flow ---

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.dataset.index);

  // Stop if cell already occupied or game inactive or AI is currently thinking
  if (board[index] !== '' || !isGameActive || (gameMode === 'ai' && currentPlayer === 'O')) {
    return;
  }

  makeMove(index, currentPlayer);

  if (isGameActive && gameMode === 'ai') {
    // Let the computer play after a slight organic delay
    setTimeout(computerPlay, 450);
  }
}

function makeMove(index, player) {
  board[index] = player;
  
  // Render marker
  cells[index].classList.add(player.toLowerCase());
  
  // Audio chime
  if (player === 'X') {
    sound.playMoveX();
  } else {
    sound.playMoveO();
  }

  updateArrayCodeDisplay();
  
  // Check results
  const winningCombo = checkWin(board, player);
  if (winningCombo) {
    declareWinner(player, winningCombo);
    return;
  }

  if (checkTie(board)) {
    declareTie();
    return;
  }

  // Switch active turn
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  updateScoreboardIndicators();
}

function checkWin(currentBoard, player) {
  for (let combo of WINNING_COMBINATIONS) {
    if (combo.every(idx => currentBoard[idx] === player)) {
      return combo;
    }
  }
  return null;
}

function checkTie(currentBoard) {
  return currentBoard.every(cell => cell !== '');
}

function declareWinner(winner, combo) {
  isGameActive = false;
  scores[winner]++;
  saveScores();
  updateScoreboard();
  
  // Play win chime
  sound.playWin();

  // Draw strike line
  highlightWinningCombination(combo);
  
  // Visual indicators in stats
  scoreCardX.classList.remove('active');
  scoreCardO.classList.remove('active');
  
  if (winner === 'X') {
    scoreCardX.classList.add('active');
  } else {
    scoreCardO.classList.add('active');
  }
}

function declareTie() {
  isGameActive = false;
  scores.Ties++;
  saveScores();
  updateScoreboard();
  
  // Play tie chime
  sound.playDraw();
  
  // Visual indicators
  scoreCardX.classList.remove('active');
  scoreCardO.classList.remove('active');
}

function updateScoreboard() {
  scoreX.innerText = scores.X;
  scoreO.innerText = scores.O;
  scoreTies.innerText = scores.Ties;
}

function updateScoreboardIndicators() {
  if (currentPlayer === 'X') {
    scoreCardX.classList.add('active');
    scoreCardO.classList.remove('active');
  } else {
    scoreCardO.classList.add('active');
    scoreCardX.classList.remove('active');
  }
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  isGameActive = true;
  
  // Reset DOM
  cells.forEach(cell => {
    cell.className = 'cell';
  });
  
  winningLine.style.opacity = '0';
  winningLine.style.transform = 'scale(0)';
  
  updateScoreboardIndicators();
  updateArrayCodeDisplay();
  
  // Reset AI engine stats display
  aiDecisionText.innerText = "Play a move to trigger AI calculations...";
  scoreBarChart.innerHTML = "";
}

// --- 7. AI Opponent Intelligence (Minimax) ---

function computerPlay() {
  if (!isGameActive) return;

  let moveIndex;
  
  if (difficulty === 'easy') {
    moveIndex = getEasyMove();
    visualizeMinimaxCalculation([]);
    aiDecisionText.innerText = "Easy mode selected. AI chose a random cell without calculations.";
  } else if (difficulty === 'medium') {
    moveIndex = getMediumMove();
    visualizeMinimaxCalculation([]);
    aiDecisionText.innerText = "Medium mode selected. AI checked immediate threat blocks and wins.";
  } else {
    // Impossible (Minimax)
    const minimaxResults = evaluateAllMovesForVisuals();
    visualizeMinimaxCalculation(minimaxResults);
    
    // Select index with the highest minimax evaluation
    let bestScore = -Infinity;
    let bestMoves = [];
    
    minimaxResults.forEach(item => {
      if (item.score > bestScore) {
        bestScore = item.score;
        bestMoves = [item.index];
      } else if (item.score === bestScore) {
        bestMoves.push(item.index);
      }
    });
    
    // If multiple equally optimal moves, choose randomly among them
    moveIndex = bestMoves[Math.floor(Math.random() * bestMoves.length)];
  }

  if (moveIndex !== undefined && moveIndex !== -1) {
    makeMove(moveIndex, 'O');
  }
}

// AI Mode: Easy (completely random choices)
function getEasyMove() {
  const empties = getEmptyCellIndices(board);
  if (empties.length === 0) return -1;
  return empties[Math.floor(Math.random() * empties.length)];
}

// AI Mode: Medium (Defends immediate danger, takes instant wins)
function getMediumMove() {
  const empties = getEmptyCellIndices(board);
  
  // 1. Can AI ('O') win right now?
  for (let index of empties) {
    let tempBoard = [...board];
    tempBoard[index] = 'O';
    if (checkWin(tempBoard, 'O')) {
      return index;
    }
  }
  
  // 2. Can Player ('X') win right now? Block it!
  for (let index of empties) {
    let tempBoard = [...board];
    tempBoard[index] = 'X';
    if (checkWin(tempBoard, 'X')) {
      return index;
    }
  }
  
  // 3. Take Center if open
  if (board[4] === '') {
    return 4;
  }
  
  // 4. Default to random
  return getEasyMove();
}

function getEmptyCellIndices(tempBoard) {
  return tempBoard
    .map((cell, idx) => cell === '' ? idx : null)
    .filter(val => val !== null);
}

// Generate the Minimax analysis structure for display in the interactive dashboard
function evaluateAllMovesForVisuals() {
  const empties = getEmptyCellIndices(board);
  const results = [];

  empties.forEach(index => {
    let tempBoard = [...board];
    tempBoard[index] = 'O'; // Assume AI plays this
    // Run minimax from this point. Since O is maximizing, next turn is minimizing (depth=1)
    const score = runMinimax(tempBoard, 0, false);
    results.push({ index, score });
  });

  return results;
}

/**
 * Standard Recursive Minimax Engine
 * @param {Array} tempBoard - current hypothetical board layout
 * @param {Number} depth - current search tree depth (helps prioritize faster wins)
 * @param {Boolean} isMaximizing - true if AI turn (maximizing), false if human turn (minimizing)
 */
function runMinimax(tempBoard, depth, isMaximizing) {
  // Base cases: check terminal states
  if (checkWin(tempBoard, 'O')) return 10 - depth; // Positive for AI victory (faster is better)
  if (checkWin(tempBoard, 'X')) return depth - 10; // Negative for player victory (slower is better)
  if (checkTie(tempBoard)) return 0; // Draw is neutral

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

// Initialize Board Display Code on Load
updateArrayCodeDisplay();
updateScoreboard();
updateScoreboardIndicators();
