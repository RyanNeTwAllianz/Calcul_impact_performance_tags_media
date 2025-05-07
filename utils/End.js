

const End = async(browser, har, time = 15000) => {
    await new Promise(resolve => setTimeout(resolve, time))

    await har.stop()
    await browser.close()

    await new Promise(resolve => setTimeout(resolve, 2000))
}

export default End