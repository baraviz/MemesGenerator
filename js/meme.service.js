'use strict'

// === IMG MODEL ===
const gImgs = [
    { id: 1, url: 'media/img/1.jpg', keywords: ['cute', 'dog', 'sleep', 'baby'] },
    { id: 2, url: 'media/img/2.jpg', keywords: ['cute', 'dog', 'love', 'friends'] },
    { id: 3, url: 'media/img/3.jpg', keywords: ['funny', 'trump', 'donald'] },
]
const gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

// === GALLERY RENDER ===
function renderGallery(gImgs) {
    const galleryContainer = document.querySelector('.gallery-container')
    galleryContainer.innerHTML = '' // Clear previous
    gImgs.forEach(img => {
        galleryContainer.innerHTML += `
            <img src="${img.url}" onclick="onSelectImg(this)" class="${img.id}" />
        `
    })
}
