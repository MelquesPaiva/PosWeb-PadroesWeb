const buttonStartCamera = document.querySelector('[data-video-botao]')
const fieldCamera = document.querySelector('[data-camera]')
const video = document.querySelector('[data-video]')
const buttonTakePicture = document.querySelector('[data-tirar-foto]')
const canvas = document.querySelector('[data-video-canvas]')
const message = document.querySelector('[data-mensagem]')
const buttonSend = document.querySelector('[data-enviar]')

var imageUrl = ''

buttonStartCamera.addEventListener('click', async function() {
    const startVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
    buttonStartCamera.style.display = 'none'
    fieldCamera.style.display = 'block'
    video.srcObject = startVideo
})

buttonTakePicture.addEventListener('click', function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    imageUrl = canvas.toDataURL('image/jpeg')
    fieldCamera.style.display = 'none'
    message.style.display = 'block'
})

buttonSend.addEventListener('click', function() {
    const existentData = localStorage.getItem('cadastro')
    const existentDataConverted = JSON.parse(existentData)
    existentDataConverted.image = imageUrl
    localStorage.setItem('cadastro', JSON.stringify(existentDataConverted))
    window.location.href = './abrir-conta-form-3.html'
})
