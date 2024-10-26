const contextRelated = {
    "foco": "foco",
    "short": "descanso-curto",
    "long": "descanso-longo",
}
const contextTimer = {
    "foco": 1500, // 25 minutos
    "short": 300, // 5 minutos
    "long": 900 // 15 minutos
}
const html = document.querySelector('html')
const playMusicEl = document.getElementById('alternar-musica')
const appCardButtons = document.querySelectorAll('.app__card-button')
const startPauseButton = document.querySelector('#start-pause')
const startPauseButtonDescription = document.querySelector("#start-pause span")
const startPauseIcon = document.querySelector("#start-pause img")
const timerElement = document.querySelector('#timer')
const beepSound = new Audio('sons/beep.mp3')
const musicSound = new Audio('sons/luna-rise-part-one.mp3')

var currentInterval = null;
var timeValueWhenStoped = null
var timer = contextTimer.foco

musicSound.loop = true
showCurrentTime()

appCardButtons.forEach(function (button) {
    button.addEventListener('click', () => changePropertiesCardButtonClick(button))
})

playMusicEl.addEventListener('change', () => {
    if (musicSound.paused) {
        musicSound.play()
        return
    }
    musicSound.pause()
})

startPauseButton.addEventListener('click', () => {
    beepSound.pause()

    if (currentInterval !== null) {
        stopTimer()
        return
    }

    startPauseButtonWithPauseContent()
    playSound()
    executeTimer()
})

function changePropertiesCardButtonClick(button) {
    const currentActiveButton = document.querySelector('.app__card-button.active')
    const context = button.getAttribute('data-contexto')
    const contextRelatedData = contextRelated[context]
    const imageEl = document.querySelector('.app__image')
    const appTitle = document.querySelector('.app__title')

    clearInterval(currentInterval)
    currentInterval = null

    currentActiveButton.classList.remove('active')
    button.classList.add('active')
    html.setAttribute('data-contexto', contextRelatedData)
    imageEl.setAttribute('src', `imagens/${contextRelatedData}.png`)
    appTitle.innerHTML = resolveTitleTextByContext(context)
    timeValueWhenStoped = null
    timer = contextTimer[context]
    showCurrentTime()
    startPauseButtonWithStartContent()
}

function resolveTitleTextByContext(context) {
    switch (context) {
        case "foco":
            return `Otimize sua produtividade,
                <br><strong class="app__title-strong">mergulhe no que importa.</strong>`
        case "short":
            return `Que tal dar uma respirada?
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`
        case "long":
            return `Hora de voltar à superficie
                <strong class="app__title-strong">Faça uma longa pausa.</strong>`
        default:
            alert('Contexto desconhecido')
    }
}

function stopTimer() {
    clearInterval(currentInterval)
    currentInterval = null
    startPauseButtonWithStartContent()
    pauseSound()
}

function playSound() {
    const audio = new Audio('sons/play.wav')
    audio.play()
}

function pauseSound() {
    const audio = new Audio('sons/pause.mp3')
    audio.play()
}

function executeTimer() {
    const timerFunction = function() {
        timer = timer - 1
        showCurrentTime()

        if (timer < 0) {
            finishTimer(currentInterval)
        }
    };
    currentInterval = setInterval(timerFunction, 1000)
}

function showCurrentTime() {
    const timerAsMinutesSeconds = new Date(timer * 1000)
        .toISOString()
        .substring(14, 19)
    timerElement.innerHTML = timerAsMinutesSeconds
}

function finishTimer(intervalId) {
    clearInterval(intervalId)
    beepSound.play()
    timeValueWhenStoped = null
    startPauseButtonWithStartContent()
    currentInterval = null
}

function startPauseButtonWithStartContent() {
    startPauseButtonDescription.textContent = 'Começar'
    startPauseIcon.setAttribute('src', 'imagens/play_arrow.png')
}

function startPauseButtonWithPauseContent() {
    startPauseButtonDescription.textContent = 'Pausar'
    startPauseIcon.setAttribute('src', 'imagens/pause.png')
}
