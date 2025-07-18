'use strict'

// === IMG MODEL ===
const gImgs = [
    { id: 1, url: 'media/img/1.jpg', keywords: ['cute', 'dog', 'sleep', 'baby'] },
    { id: 2, url: 'media/img/2.jpg', keywords: ['cute', 'dog', 'love', 'friends'] },
    { id: 3, url: 'media/img/3.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 4, url: 'media/img/4.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 5, url: 'media/img/5.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 6, url: 'media/img/6.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 7, url: 'media/img/7.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 8, url: 'media/img/8.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 9, url: 'media/img/9.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 10, url: 'media/img/10.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 11, url: 'media/img/11.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 12, url: 'media/img/12.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 13, url: 'media/img/13.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 14, url: 'media/img/14.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 15, url: 'media/img/15.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 16, url: 'media/img/16.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 17, url: 'media/img/17.jpg', keywords: ['funny', 'trump', 'donald'] },
    { id: 18, url: 'media/img/18.jpg', keywords: ['funny', 'trump', 'donald'] },
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




