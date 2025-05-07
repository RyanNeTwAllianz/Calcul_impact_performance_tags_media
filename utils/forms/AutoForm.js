import Click from "../triggers/Click.js"
import AutoFormFq from "./AutoFormFq.js"
import AutoFormPl from "./AutoFormPl.js"


const AutoForm = async(page) => {

    await AutoFormFq(page)
    
    await Click(page, 'button[alt="AFF"]')

    await AutoFormPl(page)
}

export default AutoForm