// CURRENT MEME
let gMeme
let gLines


function createLine(pos) {
    gMeme.lines.push({
        pos,
        txt: 'I sometimes eat Falafel',
        size: 60,
        color: '#1455e4',
        strokeColor: 'black',
        isDrag: false
    })
}


function createMeme(pos) {
    gMeme = {
        selectedImgId: 5,
        selectedLineIdx: 0,
        lines: [
            {
                pos,
                txt: 'I sometimes eat Falafel',
                size: 60,
                color: '#1455e4',
                strokeColor: 'black',
                isDrag: false
            }
        ]
    }
}

function getMeme() {
    return gMeme
}

//* Check if the click is inside the circle 
function isCircleClicked(clickedPos) {
    const { pos } = gCircle

    //*  Calc the distance between clickedPos and the circle center
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)

    //* If its smaller then the radius of the circle we are inside the circle
    return distance <= gCircle.size
}


function setCircleDrag(isDrag) {
    gCircle.isDrag = isDrag
}

//* Move the circle center in the exact amount the mouse moved while clicked
function moveCircle(dx, dy) {
    gCircle.pos.x += dx
    gCircle.pos.y += dy
}


function setCirclePos(x, y) {
    gCircle.pos.x = x
    gCircle.pos.y = y
}

