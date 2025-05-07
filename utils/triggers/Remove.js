const removeElement = async (page, selector) => {
    try {
        await page.evaluate((sel) => {
            const el = document.querySelector(sel)
            if (el) el.remove()
        }, selector)
    } catch (error) {
        console.warn('Erreur :', error)
    }
}

export default removeElement
