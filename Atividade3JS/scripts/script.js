import validateCpf from "./validateCpf.js"
import validateAge from "./validateAge.js"

const inputValidationFunction = {
    "cpf": validateCpf,
    "aniversario": validateAge,
}
const requiredInputs = document.querySelectorAll(".principal__formulario input[required]")

requiredInputs.forEach(function(input) {
    input.addEventListener('blur', () => validateField(input))
})

function validateField(input) {
    const inputValidation = inputValidationFunction[input.name]
    if (inputValidation === undefined) {
        console.log(`Validação não definida para o input ${input.name}`)
        return
    }
    try {
        inputValidation(input)
        clearErrorMessage(input)
    } catch (e) {
        renderErrorMessage(input, e.message)
    }
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
