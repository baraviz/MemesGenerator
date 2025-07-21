'use strict'

// === GLOBALS ===
var gElCanvas
var gCtx
var gElImg
var gIsDragging = false
var gDragStartPos = null
var gElMeme

// === QUERY PARAMS ===
const params = new URLSearchParams(window.location.search)
const page = params.get('page')

// === APP INIT ===
function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery(gImgs)
    renderEmojies(['😜', '🤑', '💩', '🤬'])
    renderCanvas()
    onTypingText()
    onTextSizeUp()
    onTextSizeDown()
    onDeleteLine()
    onChangeFillColor()
    onChangeStrokeColor()
    onShowGallery()
    onEditMeme()
    onChangeLine()
    onAlignLeft()
    onAlignRight()
    onAlignCenter()
    preventDoubleTapZoom()
    onSearchMeme()
    onSaveMeme()
    showSavedMemesSection()
    onAddEmoji()
}

// === PAGE NAVIGATINS (PARAMS) ===
function onShowGallery() {
    const elEditorSection = document.querySelector('.memes-editor-section')
    const elGalleryLink = document.querySelector('.gallery-btn')
    const elLinksInHeader = document.querySelectorAll('#myTopnav a')
    const elGallery = document.querySelector('.gallery')

    elGalleryLink.addEventListener('click', () => {
        elEditorSection.style.display = 'none'
        elGallery.style.display = 'block'
        window.history.pushState({}, '', '?page=gallery')

        elLinksInHeader.forEach((elLink) => {
            elLink.classList.remove('active')
        });

        elGalleryLink.classList.add('active')
        document.querySelector('.gallery h2').innerText = 'Select an image'

    })
    renderCanvas()
}

function onEditMeme() {
    const elLinksInHeader = document.querySelectorAll('#myTopnav a')
    const elEditorSection = document.querySelector('.memes-editor-section')
    const elEditorLink = document.querySelector('.editor-btn')
    const elImgs = document.querySelectorAll('.gallery-container img')
    const allReffersToEdit = [...elImgs, elEditorLink]

    allReffersToEdit.forEach((img) => {
        img.addEventListener('click', () => {
            elLinksInHeader.forEach((elLink) => {
                elLink.classList.remove('active')
            })
            elEditorLink.classList.add('active')
            elEditorSection.style.display = 'flex'
            window.history.pushState({}, '', `?page=editor`)

            document.querySelector('.gallery h2').innerText = 'Replace image'
        })
    })
    renderCanvas()
}

function showSavedMemesSection() {
    const elLinksInHeader = document.querySelectorAll('#myTopnav a')
    const elSavedMemesBtn = document.querySelector('.my-memes-btn')

    elSavedMemesBtn.addEventListener('click', () => {
        document.querySelector('.saved-memes').style.display = 'block'
        document.querySelector('.gallery').style.display = 'none'
        document.querySelector('.memes-editor-section').style.display = 'none'
        elLinksInHeader.forEach((elLink) => {
            elLink.classList.remove('active')
            elSavedMemesBtn.classList.add('active')
        })
        window.history.pushState({}, '', `?page=SavedMemes`)
        renderSavedMemes()
    })
}


// === IMAGE ===
function onSelectImg(elImg) {
    gElImg = elImg
    console.log('gElImg', gElImg);

    coverCanvasWithImg(elImg)
    renderLines()
    scrollToTop()
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onSearchMeme() {
    const searchInput = document.getElementById('search-memes')
    searchInput.addEventListener('input', () => {
        filterImages(searchInput.value)
    })
}

function onKeyword(elKeyword) {
    var textInput = document.getElementById('search-memes')
    textInput.value = elKeyword.innerHTML
    console.log('elKeyword', elKeyword);
    console.log('elKeyword.innerText', elKeyword.innerText);
}


function onUploadImage(ev) {
    const file = ev.target.files[0]
    if (!file) return

    const imgLink = URL.createObjectURL(file)
    console.log('imgLink', imgLink)

    const img = new window.Image()
    img.onload = () => {
        gElImg = img
        renderCanvas()
    }
    img.src = imgLink

    document.querySelector('.memes-editor-section').style.display = 'flex'
    document.querySelector('.saved-memes').style.display = 'none'
    document.querySelector('.gallery').style.display = 'none'
    scrollToTop()
}

// === LINES CRUD ===
function onAddLine() {
    const textInput = document.getElementById('edit-line-text')
    const lines = getLines()
    const pos = lines.length === 0
        ? { x: 20, y: 80 }
        : { x: 20, y: (80 + 60 * lines.length) % 400 }
    createLine(pos, textInput.value)
    renderCanvas()
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

function onTypingText() {
    const textInput = document.getElementById('edit-line-text')
    textInput.addEventListener('change', () => {
        const selectedLine = getSelectedLine()
        if (!selectedLine) return
        selectedLine.txt = textInput.value
        gCtx.font = `${selectedLine.size}px Arial`
        selectedLine.width = gCtx.measureText(selectedLine.txt).width
        renderCanvas()
    })
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
            lineFocus(line)
        }
    })
    // console.log('lines', lines)
}

function lineFocus(line) {
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

// === LINE STYLING===

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
function onChangeFillColor() {
    const changeFillPicker = document.getElementById('edit-text-color')
    // console.log('changeFillPicker', changeFillPicker);
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

function onChangeLine() {
    const changeLineBtn = document.querySelector('.change-line-btn')
    changeLineBtn.addEventListener('click', () => {
        const selectedLine = getSelectedLine()
        if (!selectedLine) return
        const lineSwitched = changeLine()
        renderCanvas()
        document.getElementById('edit-line-text').value = lineSwitched.txt

    })
}

function onAlignLeft() {
    const textAlignLeft = document.querySelector('.text-align-left')
    textAlignLeft.addEventListener('click', () => {
        const selectedLine = getSelectedLine()
        if (!selectedLine) return
        alignToLeft()
        renderCanvas()
    })
}

function onAlignRight() {
    const textAlignRight = document.querySelector('.text-align-right')
    textAlignRight.addEventListener('click', () => {
        const selectedLine = getSelectedLine()
        if (!selectedLine) return
        alignToRight()
        renderCanvas()
    })
}

function onAlignCenter() {
    const textAlignCenter = document.querySelector('.text-align-center')
    textAlignCenter.addEventListener('click', () => {
        const selectedLine = getSelectedLine()
        if (!selectedLine) return
        alignToCenter()
        renderCanvas()
    })
}

function onAddEmoji(elEmoji) {
    const emoji = elEmoji.innerText
    // console.log('emoji', emoji);
    createLine({ x: 20, y: 100 }, emoji)
    renderCanvas()
}


// === DOWNLOAD
function downloadCanvas(elLink) {
    removeLinesFocus()
    renderCanvas()
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}


// === SAVE ===
function onSaveMeme() {
    document.querySelector('.save-meme').addEventListener('click', () => {
        removeLinesFocus()
        renderCanvas()
        const memeToSave = {
            url: gElImg.src || gElImg.getAttribute('src'),
            lines: loadFromStorage(gLines),
            createdAt: new Date().toLocaleString(),
            imageData: gElCanvas.toDataURL()
        }
        let memes = loadFromStorage('memes') || []
        memes.push(memeToSave)
        saveToStorage('memes', memes)
        alert('Meme saved!')
    })
}


function renderSavedMemes() {
    const memes = loadFromStorage('memes')
    const memesSection = document.querySelector('.saved-memes')
    memesSection.innerHTML = '<h2>Saved Memes</h2>'
    memes.forEach((meme, idx) => {
        memesSection.innerHTML += `
            <div class="meme-card">
               <button onclick="onDeleteSavedMeme(${idx})">x</button>
               <img src="${meme.imageData}" width="150" height="150" onclick="onEditSavedMeme(${idx})" style="cursor:pointer"/>
               <p class="editor-name">Bar</p>
               <p class="last-edited">${meme.createdAt}</p>
            </div>
            `
    })
}

function onEditSavedMeme(idx) {
    const memes = loadFromStorage('memes')
    const meme = memes[idx]
    gLines = JSON.parse(JSON.stringify(meme.lines))
    gSelectedLineIdx = gLines.length ? 0 : -1

    const img = new window.Image()
    img.onload = () => {
        gElImg = img
        renderCanvas()
    }
    img.src = meme.url

    document.querySelector('.memes-editor-section').style.display = 'flex'
    document.querySelector('.saved-memes').style.display = 'none'
    document.querySelector('.gallery').style.display = 'none'
    scrollToTop()
}


function onDeleteSavedMeme(idx) {
    let memes = loadFromStorage('memes')
    memes.splice(idx, 1)
    saveToStorage('memes', memes)
    renderSavedMemes()
}

function onEmojiNextPage() {
    const emojies = filterEmojiesOnPage(true)
    // console.log('emojies', emojies);
    renderEmojies(emojies)
}

function onEmojiPrevPage() {
    const emojies = filterEmojiesOnPage(false)
    // console.log('emojies', emojies);
    renderEmojies(emojies)
}


function renderEmojies(emojies) {
    var elStickersContainer = document.querySelector('.stickers-container')
    // const emojies = filterEmojiesOnPage('')
    var render = `<button onclick="onEmojiPrevPage()"><i class="fa-solid fa-angle-left" style="color: #bdbdbd;"></i></button>\n`
    emojies.forEach((emoji) => {
        render += `<button class="emoji" onclick="onAddEmoji(this)">${emoji}</button>\n`
    })
    render += `<button onclick="onEmojiNextPage()"><i class="fa-solid fa-angle-right" style="color: #bdbdbd;"></i></button>`
    console.log('render', render);
    elStickersContainer.innerHTML = render
}



// === HELPERS ===
function getCtx() {
    return gCtx
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function preventDoubleTapZoom() {
    var lastTouchEnd = 0;
    document.addEventListener('touchend', (ev) => {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
            ev.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}
