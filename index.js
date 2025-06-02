import End from './utils/End.js';
import Init from './utils/Init.js';
import urls from './const/Urls.js'
import CreateFolder from './utils/CreateFolder.js';
import GetTodayDateAndTime from './utils/GetTodayDateAndTime.js';
import GetArgsFromCmd from './utils/GetArgsFromCmd.js';
import ExecutePython from './utils/ExecutePython.js';

//Crée le dossier exports et csv
CreateFolder('./exports')
CreateFolder('./csv')

//Crée le sous-dossier exports/exports_XXXXX
const folderName = `export_${GetTodayDateAndTime()}`
CreateFolder(`./exports/${folderName}`)

//Recuper la variable depuis la commande
const argIteration = GetArgsFromCmd()

//Loop sur chaque parcours
for (const url in urls) {
    const element = urls[url]
    console.log(`${element.fileName} ${element.acceptCookies ? 'with' : 'without'} cookies start crawl ...`)
    
    let iteration = 1
    while (iteration <= argIteration) {
        //Lancement du browser ainsi que l'enregistrement des .har
        const {browser, page, har} = await Init(
            element,
            folderName,
            iteration
        )

        //Execution de la fonction propre a l'élement
        const harOpt = await element.function(page, element, folderName, iteration)

        //Arrete l'execution du browser et aussi l'enregistrement des .har
        await End(browser, har ?? harOpt)
        
        console.log(`${element.acceptCookies ? 'with' : 'without'} cookies finished with success, iteration number: ${iteration}`)
        iteration++
    }
}

//Execute le script python afin de crée les differents .csv dans le dossier csv
ExecutePython(argIteration)
