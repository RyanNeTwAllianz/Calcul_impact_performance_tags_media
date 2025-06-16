import GuessValueFromId from "../GuessValueFromId.js"
import Click from "../triggers/Click.js"
import Type from "../triggers/Type.js"

const radios = [
    'app-form-button[data-testid="form-button-maison"]',
    'app-form-button[data-testid="form-button-main-residence"]',
    'app-form-button[data-testid="button-proprietaire"]',
    'button[data-testid="continue-button"]',

]

const texts = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'phoneNumber'
]

const MrhFromFq = async(page) => {

    for (const radio in radios) {
        const input = radios[radio]
        await Click(page, input)
        await page.waitForNavigation()
    }

    await Type(page, 'input[formcontrolname="zipCode"]', GuessValueFromId('zipCode'))
    await new Promise(resolve => setTimeout(resolve, 1000))
    await Click(page, 'button[data-testid="continue-button"]')
    await page.waitForNavigation()

    await Click(page, 'nx-radio[value="M"]')
    for (const text in texts) {
        const input = texts[text]
        await Type(page, `input[formcontrolname="${input}"]`, GuessValueFromId(input))
    }
    await Click(page, 'nx-radio[data-testid="cnil-radio-no"]')
    await Click(page, 'button[data-testid="submit-button"]')
    await page.waitForNavigation()

}

export default MrhFromFq