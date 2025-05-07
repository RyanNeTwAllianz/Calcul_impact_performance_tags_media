import Click from "../triggers/Click.js"
import Type from "../triggers/Type.js"
import GuessValueFromId from "../GuessValueFromId.js"


const AutoFormOnlyFirstStep = async(page) => {

    //First step
    await Click(page, 'nx-selectable-card:has(input[value="PLATE_NUMBER"])')
    await Type(page, '[formcontrolname="immatNumber"]', GuessValueFromId('immatNumber'))
    await Click(page, '.back-button')
    await Type(page, '[formcontrolname="zipCode"]', GuessValueFromId('zipCode'))
    await Click(page, '[nxsteppernext]')

}

export default AutoFormOnlyFirstStep