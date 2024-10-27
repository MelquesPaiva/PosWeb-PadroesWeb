import { messages } from "../messages/messages.js"

const errorTypes = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError',
]

export default function validateRequiredInput(input, errorDivId = '', customizeValidationFunctionsForInputs = null) {
    let message = ''
    input.setCustomValidity('')

    if (customizeValidationFunctionsForInputs) {
        const customizedValidationFunction = customizeValidationFunctionsForInputs[input.name]
        if (customizedValidationFunction) customizedValidationFunction(input)
    }

    errorTypes.forEach((error) => {
        if (input.validity[error]) message = messages[input.name][error]
        if (input.validity.customError && input.validationMessage) message = input.validationMessage
    })

    if (!input.checkValidity()) {
        setErrorMessage(errorDivId, message)
        return
    }

    clearInputErrorMessage(errorDivId)
}

function setErrorMessage(errorDivId, errorMessage) {
    const inputError = document.querySelector(`#${errorDivId}`)
    inputError.textContent = errorMessage
}

function clearInputErrorMessage(errorDivId) {
    const inputError = document.querySelector(`#${errorDivId}`)
    inputError.textContent = ''
}

