'use strict'

var gElCanvas
var gCtx
var gElImg


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}

function onSelectImg(elImg) {
    gElImg = elImg
    coverCanvasWithImg(elImg)
}

//* Lets cover a fixed-width canvas using an img
//* changing the canvas height
function coverCanvasWithImg(elImg = document.querySelector('img')) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
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
