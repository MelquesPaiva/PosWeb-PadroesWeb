export default function validatePassword(input) {
    if (input.type !== 'password') {
        return
    }

    if (!passwordHasUppercaseLetter(input.value)) {
        input.setCustomValidity('A senha deve conter ao menos um caractere maiúsculo')
        return
    }

    if (!passwordHasANumber(input.value)) {
        input.setCustomValidity('A senha deve conter ao menos um caracter numérico')
        return
    }
}

function passwordHasUppercaseLetter(password) {
    return password !== password.toLowerCase()    
}

function passwordHasANumber(password) {
    return password.match(/\d+/) !== null
}
