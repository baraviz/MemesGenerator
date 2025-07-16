'use strict'

// CANVAS MODEL
var gElCanvas
var gCtx
var gElImg


// var gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             pos,
//             txt: 'I sometimes eat Falafel',
//             size: 60,
//             color: '#1455e4',
//             strokeColor: 'black',
//             isDrag: false
//         }
//     ]
// }



function onInit() {
    // canvas setting
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery(gImgs)

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
    // line setting (initial)
    gCtx.font = '40px Arial'
    gCtx.fillStyle = '#ffffff'
    gCtx.strokeStyle = '#000000'
    gCtx.lineWidth = 1
    // draw line
    gCtx.fillText('Hello Canvas!', 80, 100)
    gCtx.strokeText('Hello Canvas!', 80, 100)
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
}

function renderLine() {
    //* Get the props we need from the circle
    const { pos, color, size } = getCircle()
    //* Draw the circle
    drawArc(pos.x, pos.y, size, color)
}
