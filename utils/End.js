

const End = async(browser, har, time = 5000) => {
    await new Promise(resolve => setTimeout(resolve, time))

    await har.stop()
    await browser.close()

    await new Promise(resolve => setTimeout(resolve, 1000))
}

export default End
