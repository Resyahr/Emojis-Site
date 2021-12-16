//Written by Rhayser
// Code needs to be better, but, take into account that I'm learning 😅

let firstLoad = true
let showUsers = false

//DOM SECTIONS
const introEl = document.getElementById('intro-container')
const mainEl = document.getElementById('main-content')

//DOM ELEMENTS
const usersEl = document.getElementById('users-container')
const writeUsers = document.getElementById('users-el')
const nameInput = document.getElementById('ask-name-input')
const typeNameCheckEl = document.getElementById('type-name-el')
const userName = document.getElementById('user-name')
const emojisEl = document.getElementById('emojis-container')
const emojisInput = document.getElementById('emojis-input')

//DOM BTN'S
const deleteUserBtn = document.getElementById('clear-user-btn')
const submitBtn = document.getElementById('submit-name-btn')
const goBack = document.getElementById('go-back')
const emojiSite = document.getElementById('emojisSite')
const unshiftBtn = document.getElementById('unshift-btn')
const shiftBtn = document.getElementById('shift-btn')
const pushBtn = document.getElementById('push-btn')
const popBtn = document.getElementById('pop-btn')

//Arrays to save data
const emojis = []
const user = []

//EVENT LISTENERS
submitBtn.addEventListener('click', renderSite)
goBack.addEventListener('click', renderSite)
deleteUserBtn.addEventListener('click', function() {
    user.pop()
    localStorage.clear()
    localStorage.setItem('users', JSON.stringify(user))
    saveUser(user)
    renderUsers(user)
    
    console.log(user)
    console.log(user.length)
})


//FUNCTIONS EXECUTE
btnLogic(unshiftBtn)
btnLogic(shiftBtn)
btnLogic(pushBtn)
btnLogic(popBtn)
renderSite()

//FUNCTIONS
function renderSite() {
    renderUsers(user)
    if (firstLoad) {
        introEl.style.display = 'block'
        userName.textContent = `${nameInput.value}'s emojis`
        if (nameInput.value) {
            typeNameCheckEl.textContent = ""
        } else {
            typeNameCheckEl.textContent = "Please type a name"
        }
        if (nameInput.value) {
            saveUser(user)
            nameInput.value = ''
            usersEl.style.display = 'none'
            introEl.style.display = 'none'
            mainEl.style.display = 'block'
            emojiSite.style.display = 'block'
            goBack.style.display = 'block'
            firstLoad = false
        }
    } else {
        introEl.style.display = 'block'
        mainEl.style.display = 'none'
        emojiSite.style.display = 'none'
        goBack.style.display = 'none'
        firstLoad = true
    }
}

function renderEmojis(arr) {
    emojisEl.textContent = ''
    emojisInput.value = ''
    for (let i = 0; i < arr.length; i++) {
        let span = document.createElement('span')
        span.textContent = arr[i]
        emojisEl.append(span)
    }
} 

function btnLogic(btn) {
    btn.addEventListener('click', function() {
        if (btn === unshiftBtn) {
            if (emojisInput.value) {
                emojis.unshift(emojisInput.value)
                renderEmojis(emojis)
            }
        } else if (btn === shiftBtn) {
            emojis.shift()
            renderEmojis(emojis)
        } else if (btn === pushBtn) {
            if (emojisInput.value) {
                emojis.push(emojisInput.value)
                renderEmojis(emojis)
            }
        } else if (btn === popBtn){
            emojis.pop()
            renderEmojis(emojis)
        }
    })
}

function saveUser(arr) {
    if (nameInput.value) {
        if (arr.length < 5) {
            arr.push(nameInput.value)
        }
        localStorage.setItem('users', JSON.stringify(arr))
        console.log(localStorage.getItem('users'))
    }
}

function renderUsers() {
    let savedUsers = JSON.parse(localStorage.getItem('users'))
    writeUsers.textContent = ''
    if (localStorage.getItem('users')) {
        usersEl.style.display = 'block'
        
        for (let i = 0; i < savedUsers.length; i++) {
            let users = document.createElement('span')
            const link = document.createElement('a')
            users.appendChild(link)
            users.innerHTML = `<a href="#" class="user-link">${savedUsers[i]}</a>`
            writeUsers.append(users)
            console.log(localStorage.length)
        }
    }
}