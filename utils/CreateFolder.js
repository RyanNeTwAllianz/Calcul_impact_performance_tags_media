import GetTodayDateAndTime from './GetTodayDateAndTime.js'
import fs from 'fs'

const CreateFolder = () => {
    const folderName = `export_${GetTodayDateAndTime()}`
    fs.mkdirSync(`./exports/${folderName}`)

    console.log(`Folder created: ${folderName}`)
    return folderName
}
export default CreateFolder