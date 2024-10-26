import validateCpf from "./validateCpf.js"
import validateAge from "./validateAge.js"
import { validationMessages, errorTypes } from "./messages.js"

const customizedValidations = {
    "cpf": validateCpf,
    "aniversario": validateAge,
}
const requiredInputs = document.querySelectorAll(".principal__formulario input[required]")
const form = document.querySelector('[data-formulario]')

requiredInputs.forEach(function(input) {
    input.addEventListener('blur', () => validateField(input))
    input.addEventListener('invalid', (event) => event.preventDefault())
})
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const listResponse = Object.fromEntries(formData.entries())
    localStorage.setItem('cadastro', JSON.stringify(listResponse))
    window.location.href = './abrir-conta-form-2.html'
})

function validateField(input) {
    let message = ''
    input.setCustomValidity('')

    const inputValidation = customizedValidations[input.name]
    if (inputValidation) inputValidation(input)

    errorTypes.forEach(error => {
        if (input.validity[error]) message = validationMessages[input.name][error]
        if (input.validity.customError && input.validationMessage) message = input.validationMessage
    })

    if (!input.checkValidity()) {
        renderErrorMessage(input, message)
        return
    }

    clearErrorMessage(input)
}

function renderErrorMessage(input, errorMessage) {
    const errorElement = getErrorMessageElementForInput(input)
    if (errorElement === undefined) {
        console.log('Elemento de mensagem de erro não encontrado')
        return
    }
    errorElement.innerHTML = errorMessage
}

function clearErrorMessage(input) {
    const errorElement = getErrorMessageElementForInput(input)
    if (errorElement === undefined) {
        console.log('Elemento de mensagem de erro não encontrado')
        return
    }
    errorElement.innerHTML = ''
}

function getErrorMessageElementForInput(input) {
    const parentChildrens = Array.from(input.parentNode.children);
    return parentChildrens.find(function (children) {
        return children.classList.item(0) === 'mensagem-erro'
    })
}
