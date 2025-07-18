'use strict'

// === GLOBAL ===
var gLines = []
var gSelectedLineIdx = -1



// === SERVICE FUNCTIONS ===
function createLine(pos, txt) {
    // if (gLines.length >= 2) {
    //     alert(`Can't add another line. Currently support up to 2 lines.`)
    //     return;
    // }
    const ctx = getCtx()
    const size = 35
    if (!ctx || !gElImg) {
        alert('Please select an image before adding text or stickers!')
        return
    }
    ctx.font = `${size}px Arial`

    gLines.push({
        id: Date.now(),
        pos,
        txt,
        size,
        width: ctx.measureText(txt).width,
        color: '#ffffff',
        strokeColor: 'black',
        isDrag: false,
        isChosen: false,
    })
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
    console.log('gSelectedLineIdx', gSelectedLineIdx);

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

function changeLine() {
    if (gSelectedLineIdx !== -1) {
        gSelectedLineIdx = (gSelectedLineIdx + 1) % gLines.length
        // console.log('gSelectedLineIdx', gSelectedLineIdx)
        gLines[gSelectedLineIdx].isChosen = true
        if (gSelectedLineIdx === 0) gLines[gLines.length - 1].isChosen = false
        else gLines[gSelectedLineIdx - 1].isChosen = false
    }
    return gLines[gSelectedLineIdx]
}

function alignToLeft() {
    gLines[gSelectedLineIdx].pos.x = 20
}

function alignToRight() {
    gLines[gSelectedLineIdx].pos.x = 380 - gLines[gSelectedLineIdx].width
}

function alignToCenter() {
    gLines[gSelectedLineIdx].pos.x = 200 - gLines[gSelectedLineIdx].width / 2
}

// === HELPERS ===
function getLines() {
    return gLines
}

function getLineIdx() {
    return gSelectedLineIdx
}