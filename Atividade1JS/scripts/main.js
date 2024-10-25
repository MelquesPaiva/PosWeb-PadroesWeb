const buttonKeys = document.querySelectorAll('.tecla').forEach(function (button) {
    const classRelatedWithAudio = button.classList.item(1)
    button.addEventListener('click', () => playSound(`#som_${classRelatedWithAudio}`))
    button.addEventListener('keydown', (event) => activeButtonWhenEnterOrSpaceClick(event.code, button))
    button.addEventListener('keyup', () => removeActiveClassFromButtonIfExists(button))
})

function playSound(soundElementId) {
    const audio = document.querySelector(soundElementId)
    if (audio === null) {
        alert(`Elemento ${soundElementId} não existe`)
        return
    }

    if (audio instanceof HTMLAudioElement) {
        audio.play()
        return
    }

    alert(`Elemento ${soundElementId} não é um elemento de aúdio`)
}

function activeButtonWhenEnterOrSpaceClick(keyCode, button) {
    keyCode = keyCode.toLowerCase()
    if (keyCode === 'space' || keyCode === 'enter') {
        button.classList.add('ativa')    
    }
}

function removeActiveClassFromButtonIfExists(button) {
    const classList = button.classList
    if (classList.contains('ativa')) {
        classList.remove('ativa')
    }
}
