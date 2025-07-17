// CURRENT MEME
let gMeme
let gLines = []


function createLine(pos) {
    if (gLines.length >= 2) {
        alert('cant add another line. we currently support up to 2 lines')
    } else {
        const ctx = getCtx()
        const txt = 'I sometimes eat Falafel'
        const size = 35;
        ctx.font = `${size}px Arial`

        gLines.push(
            {
                id: Date.now(),
                pos,
                txt,
                size,
                width: ctx.measureText(txt).width,
                color: '#1455e4',
                strokeColor: 'black',
                isDrag: false,
                isChosen: false,
            }
        )
    }
}


function getLines() {
    return gLines
}

//* Check if the click is inside the circle 
function isLineClicked(clickedPos) {
    const { pos, width, size } = gLines[0]

    //* If user clicked in txt coardinates
    const isLineClicked = (pos.x <= clickedPos.x && pos.x + width >= clickedPos.x) && (pos.y >= clickedPos.y && pos.y <= clickedPos.y + size)
    if (isLineClicked) {
        gLines[0].isChosen = true
    } else {
        gLines[0].isChosen = false
    }

    console.log('isChosen', gLines[0].isChosen);
    console.log('isDrag', gLines[0].isDrag);
    
}


function setCircleDrag(isDrag) {
    if (!gLines.length) return
    gLines[0].isDrag = isDrag
}

//* Move the circle center in the exact amount the mouse moved while clicked
function moveCircle(dx, dy) {
    gLines[0].pos.x += dx
    gLines[0].pos.y += dy
}


function setCirclePos(x, y) {
    gLines[0].pos.x = x
    gLines[0].pos.y = y
}

