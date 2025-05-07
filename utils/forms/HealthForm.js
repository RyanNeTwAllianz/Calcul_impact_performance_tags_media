import GuessValueFromId from "../GuessValueFromId.js"
import Click from "../triggers/Click.js"
import Type from "../triggers/Type.js"

const ids = 
    ['firstName', 'lastName', 'birthDate', 'emailAddress', 'postalCodeHealth', 'phoneNumber', 'informationFieldHealth']

const HealthForm = async(page) => {

    for (const id in ids) {
        const value = ids[id]
        await Type(page,`#${value}`, GuessValueFromId(value))
    }

    await Click(page, '#nextButton')
}

export default HealthForm