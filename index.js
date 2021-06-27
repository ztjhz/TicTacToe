class Player {
  static xText = 'X';
  static oText = 'O';
  static xColor = '#ff5346';
  static oColor = '#03b28b';
  constructor() {
    this.oPlayer = { text: Player.oText, color: Player.oColor, score: 0 };
    this.xPlayer = { text: Player.xText, color: Player.xColor, score: 0 };
    this.currentPlayer = this.oPlayer;
    this.nextPlayer = this.xPlayer;
  }

  changePlayer() {
    const temp = this.currentPlayer;
    this.currentPlayer = this.nextPlayer;
    this.nextPlayer = temp;
  }
}

class Game {
  static WIN_CONDITIONS = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  static borderOColor = '#03b28cb2';
  static borderXColor = '#ff52469c';
  static mainColor = '#4b685fb2';

  constructor() {
    this.player = new Player();
    this.currentPlayerElement = document.querySelector('.current_player');
    this.board = new Array(9).fill('');
    this.showMessage = false;

    this.newGame();
  }

  newGame() {
    this.createBoard();
    this.initialiseEventListeners();
    this.board = new Array(9).fill('');
  }

  createBoard() {
    const game_html = `
    <div class="game_row">
      <div class="game_cell"></div>
      <div class="game_cell"></div>
      <div class="game_cell"></div>
    </div>
    <div class="game_row">
      <div class="game_cell"></div>
      <div class="game_cell"></div>
      <div class="game_cell"></div>
    </div>
    <div class="game_row">
      <div class="game_cell"></div>
      <div class="game_cell"></div>
      <div class="game_cell"></div>
    </div>
    `;

    document.querySelector('.game_container').innerHTML = game_html;

    document.querySelector(
      '.o_score'
    ).innerHTML = `${this.player.oPlayer.score}`;

    document.querySelector(
      '.x_score'
    ).innerHTML = `${this.player.xPlayer.score}`;
  }
  initialiseEventListeners() {
    document.querySelectorAll('.game_cell').forEach((cell, index) => {
      cell.id = index;

      cell.onclick = () => {
        if (!this.isOccupied(cell)) {
          // update board js
          this.board[Number(cell.id)] = this.player.currentPlayer.text;

          // update board html
          this.updateCell(cell);
          cell.classList.add('filled');

          // check winner
          const winner = this.getWinner();
          if (winner) {
            console.log(`${winner} won!`);
            if (winner === 'O') {
              this.player.oPlayer.score += 1;
            } else if (winner === 'X') {
              this.player.xPlayer.score += 1;
            }
            this.renderScore();

            this.displayMessage(winner).then(() => {
              document.querySelectorAll('.game_cell').forEach((e) => {
                e.innerHTML = '';
                e.classList.remove('filled');
              });
              this.board.fill('');
            });
          }

          // change player
          this.player.changePlayer();
          this.currentPlayerElement.innerHTML = `Current Player: ${this.player.currentPlayer.text}`;
        }
      };

      cell.onmouseover = () => {
        if (!this.isOccupied(cell)) {
          // update board html
          this.updateCell(cell);
          cell.style.color = `${this.player.currentPlayer.color}4b`;
        }
      };

      cell.onmouseleave = () => {
        // update board html
        if (!this.isOccupied(cell)) {
          cell.innerHTML = '';
        }
      };
    });
  }

  updateCell(cell) {
    cell.innerHTML = this.player.currentPlayer.text;
    cell.style.color = this.player.currentPlayer.color;
  }

  renderScore() {
    document.querySelector('.x_score').innerHTML = this.player.xPlayer.score;
    document.querySelector('.o_score').innerHTML = this.player.oPlayer.score;
  }

  isOccupied(cell) {
    if (this.showMessage) return true;
    return (
      cell.classList['value'].includes('filled') &&
      this.board[Number(cell.id)] !== ''
    );
  }

  getWinner() {
    for (const win_con of Game.WIN_CONDITIONS) {
      if (
        this.board[win_con[0]] === this.board[win_con[1]] &&
        this.board[win_con[1]] === this.board[win_con[2]] &&
        this.board[win_con[0]] !== '' &&
        this.board[win_con[1]] !== '' &&
        this.board[win_con[2]] !== ''
      )
        return this.board[win_con[0]];
    }

    // the game is still ongoing
    for (const i of this.board) {
      if (i === '') return '';
    }

    // board is fully filled
    return 'draw';
  }

  async displayMessage(message) {
    const messageContainer = document.querySelector('.game_message_container');
    if (message === 'draw') {
      messageContainer.innerHTML = 'Draw!';
      messageContainer.style.background = Game.mainColor;
    } else if (message === 'X') {
      messageContainer.innerHTML = `X Win!`;
      messageContainer.style.background = Game.borderXColor;
    } else if (message === 'O') {
      messageContainer.innerHTML = `O Win!`;
      messageContainer.style.background = Game.borderOColor;
    }
    messageContainer.style.display = 'flex';
    this.showMessage = true;
    await wait(1000);
    messageContainer.style.display = 'none';
    this.showMessage = false;
  }
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let game = new Game();
