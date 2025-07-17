'use strict'

// CANVAS MODEL
var gElCanvas
var gCtx
var gElImg;



function onInit() {
    // canvas setting
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery(gImgs)
    renderCanvas()
    onTypingText()

    //* Calc the center of the canvas
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

}

function onSelectImg(elImg) {
    gElImg = elImg
    coverCanvasWithImg(elImg)
}


//* changing the canvas height
function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onAddLine() {
    const lines = getLines()
    const linesOnCanvas = lines.length
    const pos = linesOnCanvas < 1 ? { x: 20, y: 80 } : { x: 20, y: 280 }
    createLine(pos)
    renderLines()
}

function downloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    // console.log('dataUrl:', dataUrl)
    elLink.href = dataUrl
    // Set a name for the downloaded file
    elLink.download = 'my-img'
}

// resize canvas (MVP only 'square' memes..)
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    //* Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth * 0.7
    coverCanvasWithImg(gElImg)
}


function renderCanvas() {
    gCtx.fillStyle = '#4f4f4f'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderLines()
}


function renderLines() {
    const lines = getLines()
    //* Calc the center of the canvas
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

    //* Get the props we need from the lines & render them
    lines.forEach(line => {
        const { pos, txt, color, size, strokeColor } = line
        // settings
        gCtx.font = `${size}px Arial`
        gCtx.fillStyle = color
        gCtx.strokeStyle = strokeColor
        gCtx.lineWidth = 1
        // draw line
        gCtx.fillText(txt, pos.x, pos.y)
        gCtx.strokeText(txt, pos.x, pos.y)
    });

    console.log('lines', lines);


}






// mouse on canvas events - to handle lines dragging, selecting, etc

function onDown(ev) {
    console.log(ev);
    const clickedPos = { x: ev.offsetX, y: ev.offsetY }
    const lines = getLines()
    const pos = getEvPos(ev)

    //* Exit if click/touch is not on the line
    isLineClicked(clickedPos)
    if (!lines[0].isChosen) {
        renderCanvas()
        return
    }

    gCtx.strokeStyle = "green";
    gCtx.strokeRect(lines[0].pos.x, lines[0].pos.y - lines[0].size, lines[0].width, lines[0].size + 10)

    console.log('lines[0].pos.x | lines[0].pos.y | lines[0].width | lines[0].size');
    console.log(lines[0].pos.x, lines[0].pos.y, lines[0].width, lines[0].size);
}

function onMove(ev) {
    const { isDrag } = getLines()[0]
    // console.log('isDrag:', isDrag)
    if (!isDrag) return

    const pos = getEvPos(ev)

    //* Calculate distance moved from drag start position
    const dx = pos.x - gPrevPos.x
    const dy = pos.y - gPrevPos.y
    moveCircle(dx, dy)
    // setCirclePos(pos.x, pos.y)

    //* Update prev position for next move calculation
    gPrevPos = pos

    //* Redraw the canvas with updated circle position
    renderCanvas()
}

function onUp() {
    setCircleDrag(false)
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // console.log('pos:', pos)

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the default mouse behavior
        ev.preventDefault()

        //* Gets the first touch point (could be multiple in touch event)
        ev = ev.changedTouches[0]
        /* 
        * Calculate touch coordinates relative to canvas 
        * position by subtracting canvas offsets (left and top) from page coordinates
        */
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}


function getCtx() {
    return gCtx
}


function onTypingText() {
    const textInput = document.getElementById('edit-line-text')


    textInput.addEventListener('keydown', () => {
        console.log(textInput.value)
    })
}


