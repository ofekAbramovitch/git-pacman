'use strict'

const WALL = '🧱'
const FOOD = '.'
const EMPTY = ' '
const POWERFOOD = '🍔'
const CHERRY = '🍒'
const size = 10
var gIntervalCherry
var gPowerFood = false
var gFoodCounter

const gGame = {
    score: 0,
    isOn: false
}

var gBoard

function onInit() {
    console.log('hello')
    toggleElement(['.game-over', '.game-over-win-title'])
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gIntervalCherry = setInterval(placeCherry, 15000)
    gGame.isOn = true
}

function buildBoard() {
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = board[1][8] = POWERFOOD
    board[8][1] = board[8][8] = POWERFOOD
    gFoodCounter -= 5
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    // TODO
    toggleElement(['.game-over'], false)
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    gGame.isOn = false
    if (!checkWin()) renderCell(gPacman.location, '🪦')
}

function placeCherry() {
    const emptyCells = getEmptyCells()
    if (emptyCells) return
    const cherryCell = emptyCells[getRandomIntInclusive(0, emptyCells.length)]
    gBoard[cherryCell.i][cherryCell.j] = CHERRY
    renderCell(cherryCell, CHERRY)
}

// function checkWin() {
//     for (var i = 0; i < size; i++) {
//         for (var j = 0; j < size; j++) {
//             const currCell = gBoard[i][j]
//             if (i === 0 || i === size - 1 || j === 0 || j === size - 1) continue
//             if (currCell === FOOD) {
//                 return false
//             }
//         }
//     }
//     return true
// }

function checkWin() {
    return gFoodCounter === 0
}