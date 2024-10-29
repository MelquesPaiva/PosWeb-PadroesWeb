const changeModeButton = document.createElement('button')
const body = document.querySelector('body')
const menu = document.querySelector('header nav')
const siteMode = {
    "light": "light-mode",
    "dark": "dark-mode",
}

changeModeButton.setAttribute('type', 'button')
changeModeButton.setAttribute('class', 'font-bold my-4 text-white bg-system-primary shadow-2xl rounded p-2')

setButtonBasedOnCurrentMode(getCurrentModeFromLocalStorage())

menu.appendChild(changeModeButton)

changeModeButton.addEventListener('click', () => {
    const currentMode = body.getAttribute('data-context')
    setCurrentModeOnLocalStorage(currentMode)
    setButtonBasedOnCurrentMode(currentMode)
})

function setButtonBasedOnCurrentMode(currentMode) {
    if (currentMode === siteMode.light) {
        changeModeButton.classList.remove('bg-system-primary')
        changeModeButton.classList.add('bg-system-medium')
        changeModeButton.textContent = 'Modo Laranja'
        body.setAttribute('data-context', siteMode.dark)
        return
    }
    changeModeButton.classList.remove('bg-system-medium')
    changeModeButton.classList.add('bg-system-primary')
    changeModeButton.textContent = 'Modo Vermelho'
    body.setAttribute('data-context', siteMode.light)
}

function setCurrentModeOnLocalStorage(currentMode) {
    localStorage.setItem('current_mode', currentMode)
}

function getCurrentModeFromLocalStorage() {
    const currentModeOnStorage = localStorage.getItem('current_mode')
    if (currentModeOnStorage === '' || currentModeOnStorage === null || currentModeOnStorage === undefined) {
        return siteMode.light
    }

    return localStorage.getItem('current_mode')
}
