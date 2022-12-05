'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function toggleElement(sels, isOpen = true) {
    for (var i = 0; i < sels.length; i++) {
        const sel = sels[i]
        const el = document.querySelector(sel)
        isOpen ? el.classList.add('hidden') : el.classList.remove('hidden')
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getEmptyCells() {
    const emptyCells = []
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            const cell = gBoard[i][j]
            if (i === 0 || i === size - 1 || j === 0 || j === size - 1) continue
            if (cell === EMPTY) emptyCells.push({ i, j })
        }
    }
    return emptyCells
}