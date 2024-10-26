export default function validateAge(input) {
    if (input.name !== 'aniversario') {
        return
    }
    const dateOfBirth = new Date(input.value)
    const now = new Date()
    const birthPlus18 = new Date(dateOfBirth.getUTCFullYear() + 18, dateOfBirth.getUTCMonth(), dateOfBirth.getUTCDate())

    if (now < birthPlus18) {
        throw new Error('Você deve ter mais de 18 anos')
    }
}
