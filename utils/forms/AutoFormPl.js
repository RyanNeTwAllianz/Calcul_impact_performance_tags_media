import GuessValueFromId from "../GuessValueFromId.js"
import Click from "../triggers/Click.js"
import Type from "../triggers/Type.js"


const AutoFormPl = async(page) => {
    await page.waitForNavigation()

    //First step
    await Click(page, '.nx-button--primary')

    //Second step
    await Click(page, 'nx-radio:has(input[id="nx-radio-13-input"])')
    await Click(page, '.nx-button--primary')

    //Third step
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-2-button-8-label"])')
    await Click(page, '.nx-button--primary')

    //4th step
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-4-button-16-label"])')
    await Type(page, 'input[name="purchaseDate"]', GuessValueFromId('purchaseDate'))
    await Click(page, '.nx-button--primary')

    //5th step
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-6-button-26-label"])')
    await Click(page, '.nx-button--primary')

    //6th step
    await Click(page, 'nx-dropdown[formcontrolname="renewalDate"]')
    await Click(page, 'nx-dropdown-item[id="nx-dropdown-item-55"]')
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-8-button-32-label"])')
    await Click(page, '.nx-button--primary')

    //7th step
    await Type(page, 'input[name="addressNumber"]', GuessValueFromId('addressNumber'))
    await Type(page, 'input[name="addressName"]', GuessValueFromId('addressName'))
    await Click(page, 'nx-dropdown[formcontrolname="addressType"]')
    await Click(page, 'nx-dropdown-item[id="nx-dropdown-item-71"]')
    await Click(page, '.nx-button--primary')

    //8th step
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-10-button-40-label"])')
    await Click(page, '.nx-button--primary')      

    //9th step
    await Type(page, 'input[name="licenseIssueDate"]', GuessValueFromId('licenseIssueDate'))
    await Click(page, 'nx-radio:has(input[id="nx-radio-17-input"])')
    await Click(page, '.nx-button--primary')

    //10th step
    await Click(page, 'nx-radio:has(input[id="nx-radio-27-input"])')
    await Click(page, 'nx-radio:has(input[id="nx-radio-29-input"])')
    await Click(page, 'nx-radio:has(input[id="nx-radio-31-input"])')
    await Click(page, 'nx-radio:has(input[id="nx-radio-33-input"])')
    await Click(page, '.nx-button--primary')

    //11th step
    await new Promise(resolve => setTimeout(resolve, 2000))
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-12-button-44-label"])')
    await Click(page, 'nx-dropdown[formcontrolname="verifiedInsuredMonths"]')
    await Click(page, 'nx-dropdown-item[id="nx-dropdown-item-83"]')
    await Click(page, '.nx-button--primary')

    //12th step
    await Click(page, 'nx-dropdown[formcontrolname="formerInsurerCode"]')
    await Click(page, 'nx-dropdown-item[id="nx-dropdown-item-84"]')
    await Click(page, 'nx-dropdown[formcontrolname="insuredYears"]')
    await Click(page, 'nx-dropdown-item[id="nx-dropdown-item-108"]')
    await Click(page, '.nx-button--primary')

    //13th step
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-14-button-49-label"])')
    await Click(page, '.nx-button--primary')      

    //14th step
    await new Promise(resolve => setTimeout(resolve, 2000))
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-16-button-55-label"])')
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-18-button-56-label"])')
    await Click(page, '.nx-button--primary')      

    //15th step
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-20-button-61-label"])')
    await Click(page, 'nx-circle-toggle:has(input[aria-labelledby="nx-circle-toggle-group-22-button-67-label"])')
    await Click(page, '.nx-button--primary')
}

export default AutoFormPl