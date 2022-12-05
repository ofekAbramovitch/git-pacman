'use strict'

const PACMAN = '<img src="img/pacman.png">'
var gPacman
var gPowerFood = false

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    else if (nextCell === GHOST) {
        if (gPowerFood) {
            removeGhosts(nextLocation)
        } else gameOver()
        return
    }

    else if (nextCell === FOOD) {
        updateScore(1)
        gFoodCounter--
        if(checkWin()) {
            toggleElement(['.game-over-win-title'], false)
            gameOver()
        }
    }

    else if (nextCell === POWERFOOD) {
        if(gPowerFood) return 
        gPowerFood = true
        mortalGhost()
        setTimeout(function () {
            gPowerFood = false
            reviveGhost()
        }, 5000)
    }

    else if (nextCell === CHERRY) updateScore(10)

    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getNextVal(nextLocation))
}

function getNextVal(nextLocation) {
    if (gPacman.location.i - nextLocation.i === 1) return `<span class="up">${PACMAN}</span>`
    if (gPacman.location.i - nextLocation.i === -1) return `<span class="down">${PACMAN}</span>`
    if (gPacman.location.j - nextLocation.j === -1) return `<span class="right">${PACMAN}</span>`
    return PACMAN
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}