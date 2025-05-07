import End from './utils/End.js';
import Init from './utils/Init.js';
import urls from './const/Urls.js'
import CreateFolder from './utils/CreateFolder.js';


const folderName = CreateFolder()

for (const url in urls) {
    const element = urls[url]
    console.log(`${element.fileName} ${element.acceptCookies ? 'with' : 'without'} cookies start crawl ...`)
    
    let iteration = 1
    while (iteration <= 3) {
        const {browser, page, har} = await Init(
            element,
            folderName,
            iteration
            
        )
        
        const harOpt = await element.function(page, element, folderName, iteration)
        await End(browser, har ?? harOpt)
        
        console.log(`${element.acceptCookies ? 'with' : 'without'} cookies finished with success, iteration number: ${iteration}`)
        iteration++
    }

    iteration = 0
}