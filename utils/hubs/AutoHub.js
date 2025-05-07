import AutoFormFq from "../forms/AutoFormFq.js"
import Click from "../triggers/Click.js"


const AutoHub = async(page) => {

    await Click(page, 'a[data-component-name="Tarif auto en 1 minute"]')
    await page.waitForNavigation()
    await AutoFormFq(page)
}

export default AutoHub