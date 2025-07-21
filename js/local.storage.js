'use strict'


// === SAVE TO LOCAL STORAGE
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

// === GET ITEM FROM LOCAL STORAGE
function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
