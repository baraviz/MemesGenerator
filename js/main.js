'use strict'

// === GLOBALS ===
var gElCanvas
var gCtx
var gElImg
var gIsDragging = false
var gDragStartPos = null
var gElMeme

// === APP INIT ===
function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery(gImgs)
    renderCanvas()
    onTypingText()
    onTextSizeUp()
    onTextSizeDown()
    onDeleteLine()
    onChangeFillColor()
    onChangeStrokeColor()
}

// === IMAGE ===
function onSelectImg(elImg) {
    gElImg = elImg
    coverCanvasWithImg(elImg)
    renderLines()
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

// === LINES CRUD ===
function onAddLine() {
    const lines = getLines()
    const pos = lines.length === 0
        ? { x: 20, y: 80 }
        : { x: 20, y: 80 + 60 * lines.length }
    createLine(pos)
    renderLines()
}

// === CANVAS RENDER ===
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth * 0.7
    coverCanvasWithImg(gElImg)
}

function renderCanvas() {
    gCtx.fillStyle = '#4f4f4f'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    if (gElImg) {
        coverCanvasWithImg(gElImg)
    }
    renderLines()
}

function renderLines() {
    const lines = getLines()
    lines.forEach(line => {
        const { pos, txt, color, size, strokeColor } = line
        gCtx.font = `${size}px Arial`
        gCtx.fillStyle = color
        gCtx.strokeStyle = strokeColor
        gCtx.lineWidth = 1
        gCtx.fillText(txt, pos.x, pos.y)
        gCtx.strokeText(txt, pos.x, pos.y)

        if (line.isChosen) {
            // Draw a green rectangle around the text
            const width = gCtx.measureText(line.txt).width;
            gCtx.save();
            gCtx.strokeStyle = "green";
            gCtx.lineWidth = 2;
            gCtx.strokeRect(
                line.pos.x - 2,
                line.pos.y - line.size,
                width + 4,
                line.size + 4
            )
            gCtx.restore()
        }
    })
    // console.log('lines', lines)
}

// === EVENTS (Mouse/Touch) ===
function onDown(ev) {
    const clickedPos = getEvPos(ev)
    isLineClicked(clickedPos)
    renderCanvas()
    const selectedLine = getSelectedLine()
    if (selectedLine) {
        document.getElementById('edit-line-text').value = selectedLine.txt
        gIsDragging = true
        gDragStartPos = clickedPos
    }
}

function onMove(ev) {
    if (!gIsDragging) return
    const selectedLine = getSelectedLine()
    if (!selectedLine) return
    const pos = getEvPos(ev)
    const dx = pos.x - gDragStartPos.x
    const dy = pos.y - gDragStartPos.y
    selectedLine.pos.x += dx
    selectedLine.pos.y += dy
    gDragStartPos = pos
    renderCanvas()
}

function onUp() {
    gIsDragging = false;
    gDragStartPos = null;
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
    let pos = { x: ev.offsetX, y: ev.offsetY }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

// === EDIT LINE ===
function onTypingText() {
    const textInput = document.getElementById('edit-line-text')
    textInput.addEventListener('input', () => {
        const selectedLine = getSelectedLine()
        if (!selectedLine) return
        selectedLine.txt = textInput.value
        gCtx.font = `${selectedLine.size}px Arial`
        selectedLine.width = gCtx.measureText(selectedLine.txt).width
        renderCanvas()
    })
}

function onTextSizeUp() {
    const biggerTextBtn = document.querySelector('.bigger-text-btn')
    biggerTextBtn.addEventListener('click', () => {
        // console.log('biggerTextBtn', biggerTextBtn)
        const selectedLine = getSelectedLine()
        if (!selectedLine) return
        selectedLine.size += 4
        gCtx.font = `${selectedLine.size}px Arial`
        selectedLine.width = gCtx.measureText(selectedLine.txt).width
        renderCanvas()
    })
}

function onTextSizeDown() {
    const smallerTextBtn = document.querySelector('.smaller-text-btn')
    smallerTextBtn.addEventListener('click', () => {
        const selectedLine = getSelectedLine()
        if (!selectedLine) return
        selectedLine.size -= 4
        gCtx.font = `${selectedLine.size}px Arial`
        selectedLine.width = gCtx.measureText(selectedLine.txt).width
        renderCanvas()
    })
}

function onDeleteLine() {
    const deleteLineBtn = document.querySelector('.delete-line-btn')
    deleteLineBtn.addEventListener('click', () => {
        const selectedLine = getSelectedLine()
        console.log('selectedLine', selectedLine)
        
        if (!selectedLine) return
        const selectedLineId = selectedLine.id
        console.log('selectedLineId', selectedLineId)
        deleteLine(selectedLineId)
        renderCanvas()
    })
}

function onChangeFillColor() {
    const changeFillPicker = document.getElementById('edit-text-color')
    console.log('changeFillPicker', changeFillPicker);
    changeFillPicker.addEventListener('change', () => {
        const selectedLine = getSelectedLine()
        if (!selectedLine) return
        selectedLine.color = changeFillPicker.value
        console.log('changeFillPicker.value', changeFillPicker.value);
        renderCanvas()
    })
}

function onChangeStrokeColor() {
    const changeStrokePicker = document.getElementById('edit-stroke-color')
    changeStrokePicker.addEventListener('change', () => {
        const selectedLine = getSelectedLine()
        if (!selectedLine) return
        selectedLine.strokeColor = changeStrokePicker.value
        console.log('changeStrokePicker.value', changeStrokePicker.value);
        renderCanvas()
    })
}


function downloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}




// === HELPERS ===
function getCtx() {
    return gCtx
}
