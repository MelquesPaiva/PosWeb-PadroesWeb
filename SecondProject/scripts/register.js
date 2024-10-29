import validatePassword from "./registerValidation/passwordValidator.js";
import validateRequiredInput from "./validator/validateRequiredInput.js";


const form = document.querySelector('[data-form-register]')
const requiredInputs = document.querySelectorAll('#form-register input[required]')
const customizeValidationFunctionsForInputs = {
    "password": validatePassword,
}

requiredInputs.forEach(function (input) {
    validateRequiredInput(input, `error-${input.name}`, customizeValidationFunctionsForInputs)
    input.addEventListener('invalid', (event) => event.preventDefault())
    input.addEventListener('blur', () => validateRequiredInput(input, `error-${input.name}`, customizeValidationFunctionsForInputs))
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const userListData = localStorage.getItem('userList')
    let userList = JSON.parse(userListData)
    if (userList === null) {
        userList = []
    }
    let registerEntries = Object.fromEntries(formData.entries())
    registerEntries.id = "id" + Math.random().toString(16).slice(2)
    userList.push(registerEntries)
    localStorage.setItem('userList', JSON.stringify(userList))

    window.location.href = './success-register.html?name=' + registerEntries.name
})
