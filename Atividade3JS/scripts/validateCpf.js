import { validationMessages } from "./messages.js"

export default function validateCpf(input) {
    if (input.name !== 'cpf' || input.value.length < 11) {
        return
    }

    input.value = input.value.replace(/\.|-/g, "")
    if (cpfIsInvalidByRepeatedNumbers(input.value)) {
        input.setCustomValidity('Cpf inválido')
        return
    }

    if (invalidFirstCpfDigit(input.value) || invalidCpfSecondDigit(input.value)) {
        input.setCustomValidity('Algoritmo de CPF inválido')
    }
}

function cpfIsInvalidByRepeatedNumbers(cpf) {
    const invalidCpfList = [
        '0'.repeat(11),
        '1'.repeat(11),
        '2'.repeat(11),
        '3'.repeat(11),
        '4'.repeat(11),
        '5'.repeat(11),
        '6'.repeat(11),
        '7'.repeat(11),
        '8'.repeat(11),
        '9'.repeat(11),
    ];

    return invalidCpfList.includes(cpf)
}

function invalidFirstCpfDigit(cpf) {
    let sum = 0
    let multiplicator = 10
    for (let size = 0; size < 9; size++) {
        sum += cpf[size] * multiplicator
        multiplicator--
    }
    sum = (sum * 10) % 11
    if (sum == 10 || sum ==11) {
        sum = 0
    }
    return sum != cpf[9]
}

function invalidCpfSecondDigit(cpf) {
    let sum = 0
    let multiplicator = 11
    for (let size = 0; size < 10; size++) {
        sum += cpf[size] * multiplicator
        multiplicator--
    }
    sum = (sum * 10) % 11
    if (sum == 10 || sum ==11) {
        sum = 0
    }
    return sum != cpf[10]
}
