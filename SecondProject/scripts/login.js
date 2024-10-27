import loginUser from "./login/loginUser.js"
import validateRequiredInput from "./validator/validateRequiredInput.js"

const form = document.querySelector('#login-form')
const requiredFields = document.querySelectorAll('#login-form input[required]')

requiredFields.forEach(function (input) {
    validateRequiredInput(input, `error-${input.name}`)
    input.addEventListener('invalid', (event) => event.preventDefault())
    input.addEventListener('blur', () => validateRequiredInput(input, `error-${input.name}`))
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const loginData = Object.fromEntries(formData.entries())
    const userLogged = loginUser(loginData.email, loginData.password)
    if (userLogged === undefined) {
        setLoginErrorMessage(loginData.email)
        return
    }

    alert(`Obrigado pelo seu login ${userLogged.name}`)

    window.location.href = 'index.html'
})

function setLoginErrorMessage(email) {
    const loginErrorMessage = `
        Usuário ${email} não encontrado em nosso sistema. Realize o seu <a href="register.html" class="border-solid cursor-pointer font-bold underlined bg-system-primary text-white px-2 text-lg rounded">Cadastro</a>
    `
    const loginErrorMessageElement = document.querySelector('#login-error-message')
    loginErrorMessageElement.innerHTML = loginErrorMessage
    loginErrorMessageElement.style.display = 'block'
}
