import Type from "../triggers/Type.js"
import Click from "../triggers/Click.js"
import GuessValueFromId from "../GuessValueFromId.js"

const ids = 
    [
        'input[formcontrolname="firstName"]', 
        'input[formcontrolname="lastName"]',
        'input[formcontrolname="birthDate"]', 
        'input[formcontrolname="emailAddress"]',
        'textarea[formcontrolname="needs"]',
        '#phoneNumber'
    ]

const NveiFrom = async(page) => {

    await Click(page, 'nx-radio[value="1"]')

    for (const id in ids) {
        const input = ids[id]
        const value = input.match(/"([^"]+)"/g)?.[0].replaceAll('"', '') ?? input.replace('#', '')
        await Type(page, input, GuessValueFromId(value))
    }

    await Type(page,`input[formcontrolname="${'cityZipcode'}"]`, GuessValueFromId('cityZipcode'))
    await Click(page, 'nx-autocomplete-option[tabindex="0"]')

    await Click(page, '#finalButton')
}

export default NveiFrom