import puppeteerHar from 'puppeteer-har';
import GetTodayDate from './getTodayDate.js';

const ActivateHar = async(page, element, folderName, iteration) => {

    const har = new puppeteerHar(page)
    await har.start({ path: `./exports/${folderName}/${GetTodayDate()}_analyse_${element.fileName}_${iteration}.har` })
    
    return har
}

export default ActivateHar