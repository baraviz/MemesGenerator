'use strict'

// === GLOBAL STATE ===
var gLines = []
var gSelectedLineIdx = -1


// === SERVICE FUNCTIONS ===

function createLine(pos) {
    if (gLines.length >= 2) {
        alert(`Can't add another line.Currently support up to 2 lines.`)
        return;
    }
    const ctx = getCtx()
    const txt = 'I sometimes eat Falafel'
    const size = 35
    ctx.font = `${size}px Arial`

    gLines.push({
        id: Date.now(),
        pos,
        txt,
        size,
        width: ctx.measureText(txt).width,
        color: '#1455e4',
        strokeColor: 'black',
        isDrag: false,
        isChosen: false,
    })
}

function getLines() {
    return gLines
}


function isLineClicked(clickedPos) {
    var wasClicked = false
    gLines.forEach((line, idx) => {
        const { pos, width, size } = line
        const inX = pos.x <= clickedPos.x && pos.x + width >= clickedPos.x
        const inY = pos.y - size <= clickedPos.y && pos.y >= clickedPos.y
        const isClicked = inX && inY
        line.isChosen = isClicked
        if (isClicked) {
            gSelectedLineIdx = idx
            wasClicked = true
        }
    })
    if (!wasClicked) gSelectedLineIdx = -1
}
function getSelectedLine() {
    return gSelectedLineIdx >= 0 ? gLines[gSelectedLineIdx] : null
}

function deleteLine(selectedLineId) {
    const filteredGLines = gLines.filter(line => {
        return line.id !== selectedLineId
    })
    gLines = filteredGLines
}

