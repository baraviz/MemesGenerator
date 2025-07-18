'use strict'

// === IMG MODEL ===
const gImgs = [
    { id: 1, url: 'media/img/1.jpg', keywords: ['funny', 'trump', 'donald'] },  // היה של 3
    { id: 2, url: 'media/img/2.jpg', keywords: ['cute', 'dog', 'love', 'friends'] },
    { id: 3, url: 'media/img/3.jpg', keywords: ['cute', 'dog', 'sleep', 'baby'] }, // היה של 1
    { id: 4, url: 'media/img/4.jpg', keywords: ['cat', 'cute', 'sleep'] },  // היה של 6
    { id: 5, url: 'media/img/5.jpg', keywords: ['baby', 'funny', 'sand', 'fist'] },
    { id: 6, url: 'media/img/6.jpg', keywords: ['aliens', 'history', 'explain'] }, // היה של 4
    { id: 7, url: 'media/img/7.jpg', keywords: ['baby', 'funny', 'cute'] },   // היה של 9
    { id: 8, url: 'media/img/8.jpg', keywords: ['hat', 'classy', 'suit'] },
    { id: 9, url: 'media/img/9.jpg', keywords: ['baby', 'funny', 'china'] },  // היה של 7
    { id: 10, url: 'media/img/10.jpg', keywords: ['obama', 'laugh', 'funny'] }, // היה של 12
    { id: 11, url: 'media/img/11.jpg', keywords: ['kiss', 'boxing'] },
    { id: 12, url: 'media/img/12.jpg', keywords: ['tv', 'you', 'behave'] },     // היה של 10
    { id: 13, url: 'media/img/13.jpg', keywords: ['buzz', 'toys', 'story'] },   // היה של 15
    { id: 14, url: 'media/img/14.jpg', keywords: ['sunglasses', 'badass', 'terminator'] },
    { id: 15, url: 'media/img/15.jpg', keywords: ['exactly', 'ok', 'fine'] },   // היה של 13
    { id: 16, url: 'media/img/16.jpg', keywords: ['putin', 'two', '2'] },       // היה של 18
    { id: 17, url: 'media/img/17.jpg', keywords: ['star', 'trek', 'spock'] },
    { id: 18, url: 'media/img/18.jpg', keywords: ['classy', 'leonardo', 'dicaprio'] } // היה של 16
]


const gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

// === GALLERY RENDER ===
function renderGallery(gImgs) {
    const galleryContainer = document.querySelector('.gallery-container')
    galleryContainer.innerHTML = ''
    gImgs.forEach(img => {
        galleryContainer.innerHTML += `
            <img src="${img.url}" onclick="onSelectImg(this)" class="${img.id}" />
        `
    })
}

function filterImages(txt) {
    txt = txt.toLowerCase()
    var filteredImgs = gImgs.filter((img) => {
        return img.keywords.some(key => key.toLowerCase().includes(txt))
    })
    renderGallery(filteredImgs)
}





