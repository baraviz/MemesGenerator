'use strict'

// === IMG MODEL ===
const gImgs = [
    { id: 1, url: 'media/img/1.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 2, url: 'media/img/2.jpg', keywords: ['cute', 'dog', 'love', 'friends'] },
    { id: 3, url: 'media/img/3.jpg', keywords: ['cute', 'dog', 'sleep', 'baby'] },
    { id: 4, url: 'media/img/4.jpg', keywords: ['cat', 'cute', 'sleep'] },
    { id: 5, url: 'media/img/5.jpg', keywords: ['baby', 'funny', 'sand', 'fist'] },
    { id: 6, url: 'media/img/6.jpg', keywords: ['aliens', 'history', 'explain'] },
    { id: 7, url: 'media/img/7.jpg', keywords: ['baby', 'funny', 'cute'] },
    { id: 8, url: 'media/img/8.jpg', keywords: ['hat', 'classy', 'suit'] },
    { id: 9, url: 'media/img/9.jpg', keywords: ['baby', 'funny', 'china'] },
    { id: 10, url: 'media/img/10.jpg', keywords: ['obama', 'laugh', 'funny'] },
    { id: 11, url: 'media/img/11.jpg', keywords: ['kiss', 'boxing'] },
    { id: 12, url: 'media/img/12.jpg', keywords: ['tv', 'you', 'behave'] },
    { id: 13, url: 'media/img/13.jpg', keywords: ['buzz', 'toys', 'story'] },
    { id: 14, url: 'media/img/14.jpg', keywords: ['sunglasses', 'badass', 'terminator'] },
    { id: 15, url: 'media/img/15.jpg', keywords: ['exactly', 'ok', 'fine'] },
    { id: 16, url: 'media/img/16.jpg', keywords: ['putin', 'two', '2'] },
    { id: 17, url: 'media/img/17.jpg', keywords: ['star', 'trek', 'spock'] },
    { id: 18, url: 'media/img/18.jpg', keywords: ['classy', 'leonardo', 'dicaprio'] },
    { id: 19, url: 'media/img/003.jpg', keywords: ['classy', 'leonardo', 'dicaprio'] },
]

// ===  EMOJI MODEL ===
const MAX_EMOJI_PER_PAGE = 4
var gEmojiCurrPage = 0
const gStickers = [
    '😜', '🤑', '💩', '🤬', '🐶', '🐱', '😂', '🤣',
    '😍', '😎', '😺', '🤖', '🍕', '🌮', '🍔', '🥑',
    '🎉', '🎈', '🦄', '🚀', '🌟', '🔥', '⚡', '🎸'
]


// === MEMES MODEL ===
const gMemes = [
    {
        url: 'media/img/1.jpg',
        lines: {
            id: Date.now(),
            pos: { x: 20, y: 20 },
            txt: 'hey hey',
            size: 20,
            width: 50,
            color: '#ffffff',
            strokeColor: 'black',
            isDrag: false,
            isChosen: false,
        }
    }
]


// === GALLERY RENDER ===
function renderGallery(gImgs) {
    const galleryContainer = document.querySelector('.gallery-container')
    var galleryHTML = ''
    galleryHTML += `
        <div class="upload-image">
            <label for="img-input" id="drop-area">
                <input type="file" id="img-input" name="img"  accept="image/*" onchange="onUploadImage(event)" hidden>
                <p>Upload image</p>
                <i class="fa-solid fa-cloud-arrow-up fa-2xl"></i>
                <p>drag and drop or click here</p>
            </label>
        </div>
    `
    gImgs.forEach(img => {
        galleryHTML += `
            <img src="${img.url}" onclick="onSelectImg(this)" class="${img.id}" />
        `
    })
    galleryContainer.innerHTML = galleryHTML
}

function filterImages(txt) {
    txt = txt.toLowerCase()
    var filteredImgs = gImgs.filter((img) => {
        return img.keywords.some(key => key.toLowerCase().includes(txt))
    })
    renderGallery(filteredImgs)
}

function getImgs() {
    return gImgs
}

function filterEmojiesOnPage(isNext) {
    const totalPages = Math.ceil(gStickers.length / MAX_EMOJI_PER_PAGE)

    if (isNext) gEmojiCurrPage++
    else gEmojiCurrPage--
    console.log('gEmojiCurrPage', gEmojiCurrPage);

    if (gEmojiCurrPage >= totalPages) gEmojiCurrPage = 0
    if (gEmojiCurrPage < 0) gEmojiCurrPage = totalPages - 1

    const startIdx = gEmojiCurrPage * MAX_EMOJI_PER_PAGE
    const endIdx = startIdx + MAX_EMOJI_PER_PAGE
    const currPageEmojies = gStickers.slice(startIdx, endIdx)

    console.log('currPageEmojies', currPageEmojies);

    return currPageEmojies
}

getKewords(gImgs)