// let xImg = 'X';
// let oImg = 'O';
// let currentPlayer = 'X';
// let currentPlayerElement = document.querySelector('.current_player');

// document.querySelectorAll('.game_cell').forEach((cell) => {
//   console.log(cell);
//   cell.onclick = () => {
//     cell.innerHTML = currentPlayer === 'X' ? xImg : oImg;
//     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     currentPlayerElement.innerHTML = `Current Player: ${currentPlayer}`;
//     cell.classList.add('filled');
//   };
//   cell.onmouseover = () => {
//     if (!cell.classList['value'].includes('filled')) {
//       cell.innerHTML = currentPlayer === 'X' ? xImg : oImg;
//     }
//   };
//   cell.onmouseleave = () => {
//     if (!cell.classList['value'].includes('filled')) {
//       cell.style.background = '#fff';
//     }
//   };
// });

class Game {
  constructor() {
    this.xImg = 'X';
    this.oImg = 'O';
    this.currentPlayer = 'O';
    this.currentPlayerElement = document.querySelector('.current_player');

    this.initialiseEventListeners();
  }

  initialiseEventListeners() {
    document.querySelectorAll('.game_cell').forEach((cell) => {
      console.log(cell);
      cell.onclick = () => {
        this.updateCell(cell);
        this.changePlayer();
        this.currentPlayerElement.innerHTML = `Current Player: ${this.currentPlayer}`;
        cell.classList.add('filled');
      };
      cell.onmouseover = () => {
        if (!cell.classList['value'].includes('filled')) {
          this.updateCell(cell);
          cell.style.color = 'rgba(0,0,0,0.5)';
        }
      };
      cell.onmouseleave = () => {
        if (!cell.classList['value'].includes('filled')) {
          cell.innerHTML = '';
          cell.style.color = 'rgba(0,0,0,1)';
        }
      };
    });
  }

  changePlayer() {
    this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
  }

  updateCell(cell) {
    cell.innerHTML = this.currentPlayer === 'X' ? this.xImg : this.oImg;
    cell.style.color = 'rgba(0,0,0,1)';
  }
}

let game = new Game();
