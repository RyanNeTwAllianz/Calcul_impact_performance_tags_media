import HealthForm from "../forms/HealthForm.js"
import Click from "../triggers/Click.js"


const HealthHub = async(page) => {

    await Click(page, '.c-button-link-center-align')
    await page.waitForNavigation()
    await HealthForm(page)
}


export default HealthHub