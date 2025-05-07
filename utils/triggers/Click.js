
const Click = async(page, selector) => {

    await page.waitForSelector(selector, {visible: true})
    await page.locator(selector)?.click({delay: 120})
}

export default Click