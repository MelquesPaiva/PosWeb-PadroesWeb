const changeModeButton = document.createElement('button')
const body = document.querySelector('body')
const menu = document.querySelector('header nav')
const siteMode = {
    "light": "light-mode",
    "dark": "dark-mode",
}
changeModeButton.textContent = 'Modo Vermelho'
changeModeButton.setAttribute('type', 'button')
changeModeButton.setAttribute('class', 'font-bold my-4 text-white bg-system-primary shadow-2xl rounded p-2')

menu.appendChild(changeModeButton)

changeModeButton.addEventListener('click', () => {
    const currentMode = body.getAttribute('data-context')
    if (currentMode === siteMode.light) {
        body.setAttribute('data-context', siteMode.dark)
        changeModeButton.textContent = 'Modo Laranja'
        changeModeButton.classList.remove('bg-system-primary')
        changeModeButton.classList.add('bg-system-medium')
        return
    }
    changeModeButton.classList.remove('bg-system-medium')
    changeModeButton.classList.add('bg-system-primary')
    changeModeButton.textContent = 'Modo Vermelho'
    body.setAttribute('data-context', siteMode.light)
})
