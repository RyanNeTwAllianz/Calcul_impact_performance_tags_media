import minimist from "minimist"

//Récuperer le parametre qu'on a définit
const GetArgsFromCmd = () => {

    const args = minimist(process.argv.slice(2))
    return args._[0] ?? 3
}

export default GetArgsFromCmd