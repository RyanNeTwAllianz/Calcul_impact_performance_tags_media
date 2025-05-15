import fs from 'fs'

const CreateFolder = (path) => {
    if (fs.existsSync(path)) return

    fs.mkdirSync(`${path}`)
    console.log(`Folder created: ${path}`)
}
export default CreateFolder