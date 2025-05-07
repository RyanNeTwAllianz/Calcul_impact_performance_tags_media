
const Type = async(page, selector, value) => {
    
    await page.waitForSelector(selector, {visible: true})
    await page.type(selector, value, {delay: 120})
}

export default Type