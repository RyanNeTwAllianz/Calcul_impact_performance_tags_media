import puppeteer from 'puppeteer';
import Click from './triggers/Click.js';
import ActivateHar from './ActivateHar.js';

const Init = async (element, folderName, iteration) => {
    const browser = await puppeteer.launch(
        { 
            headless: false,
            devtools: true,
            ignoreHTTPSErrors: true,
            args: [
                '--window-size=1920,1040',
                '--no-sandbox',
                '--disable-features=SameSiteByDefaultCookies',
                '--enable-features=CookiesWithoutSameSiteMustBeSecure',
                '--disable-third-party-cookie-blocking',
                '--disable-web-security',
                '--disable-site-isolation-trials',
                '--enable-blink-features=CrossOriginOpenerPolicy',
                '--proxy-server=fr000-surf.zone2.proxy.allianz:8080'
            ]
        })

    const pages = await browser.pages()
    const page = pages.length > 0 ? pages[0] : await browser.newPage()

    let har = null

    if (element.isHar) {
        har = await ActivateHar(page, element, folderName, iteration)
    }

    await page.goto(element.url, { waitUntil : 'networkidle2' })
    await Click(page, element.acceptCookies ? '#az-cmp-btn-accept' : '#az-cmp-btn-refuse')
    
    return {browser, har, page}
}

export default Init