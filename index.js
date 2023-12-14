const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

let isGameEnd = false
let isDraw = false
let whoStarted = 'X'
let currentPlayer = 'X'
let positions = ['','','','','','','','','']

const container = document.querySelector('#container')
const cells = document.querySelectorAll('.cell')
const gameStatus = document.querySelector('#status')
const playerStatus = document.querySelector('#player')

const winPositions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [0,4,8],
]

const changePlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}

const checkWinner = () => {
  for(let i = 0; i < winPositions.length; i ++) {
    const [first, second, third] = winPositions[i]

    const cellA = positions[first]
    const cellB = positions[second]
    const cellC = positions[third]

    if(cellA === '' || cellB === '' || cellC === '') {
      continue;
    }

    if(cellA === cellB && cellB === cellC) {
      isGameEnd = true
      if(gameStatus && playerStatus) {
        playerStatus.textContent = ``
        gameStatus.textContent = `Moigo ${currentPlayer} - ma`
      }
    }
  }

  if(!isGameEnd) {
    const isAllCellNotFilled = positions.some(position => position === '')

    if(isAllCellNotFilled) {
      changePlayer()

      if(playerStatus) {
        playerStatus.textContent = `${currentPlayer} is jeria`
      }
    } else {
      isGameEnd = true
      isDraw = true
      if(gameStatus && playerStatus) {
        playerStatus.textContent = ``
        gameStatus.textContent = `Frea`
      }
    }
  }
}

const updateCell = (element, index) => {
  positions[index] = currentPlayer
  element.textContent = currentPlayer

  checkWinner()
}

const clickCell = (element) => {
  const index = element.target.getAttribute('aria-colindex')

  if(positions[index] !== '') {
    return
  }

  if(isGameEnd) {
    return
  }

  updateCell(element.target, index)
}

const resetGame = () => {
  if(isDraw && isGameEnd) {
    currentPlayer = getRandomInt(0, 2) === 0 ? 'O' : 'X'
    whoStarted = currentPlayer
    console.log('draw and game end', currentPlayer)
  } else if(!isDraw && isGameEnd) {

  } else {
    currentPlayer = whoStarted
    console.log('vin daiwyo winaze', whoStarted)
  }

  if(playerStatus && gameStatus) {
    gameStatus.textContent = ''
    playerStatus.textContent = `${currentPlayer} is jeria`
  }

  isGameEnd = false
  isDraw = false
  positions = positions.map(() => '')
  cells.forEach(cell => cell.textContent = '')
}

const startGame = () => {
  cells.forEach(cell => cell.addEventListener('click', clickCell))
}

startGame()
