import AutoFormFq from "../utils/forms/AutoFormFq.js";
import AutoForm from "../utils/forms/AutoForm.js";
import AutoHub from "../utils/hubs/AutoHub.js";
import AutoFormOnlyFirstStep from '../utils/forms/AutoFormOnlyFirstStep.js'
import HealthForm from "../utils/forms/HealthForm.js";
import HealthHub from "../utils/hubs/HealthHub.js";
import ActivateHar from "../utils/ActivateHar.js";
import NveiFrom from "../utils/forms/NveiFrom.js";
import MrhFromFq from "../utils/forms/MrhFromFq.js";

const healthFormUrl = 'https://www.allianz.fr/assurance-particulier/formulaire/devis-sante.html'
const healthHubUrl = 'https://www.allianz.fr/assurance-particulier/sante-prevoyance/assurance-sante.html'

const autoFormUrl = 'https://devis-assurance.allianz.fr/tarif-auto/collect-data'
const autoHubUrl = 'https://www.allianz.fr/assurance-particulier/vehicules/assurance-auto.html'

const nveiFormUrl = 'https://www.allianz.fr/assurance-particulier/vehicules/assurance-autres-vehicules/nouvelles-mobilites/devis-contact.html'

const mrhFromUrl = 'https://devis-assurance.allianz.fr/tarif-express-habitation/fq'

const urls = [
    {
        url: autoHubUrl,
        acceptCookies: true,
        fileName: 'auto-tarif-fq_lp-hub',
        isHar: true,
        function: async(page) => AutoHub(page)
    },
    {
        url: autoFormUrl,
        acceptCookies: true,
        fileName: 'auto-tarif-pl_direct',
        isHar: true,
        function: async(page) => AutoForm(page)
    },
    {
        url: autoFormUrl,
        acceptCookies: true,
        fileName: 'auto-etape1-a-etape2',
        isHar: false,
        function: async(page, element, folderName, iteration) => {
            const har = await ActivateHar(page, element, folderName, iteration)
            await AutoFormOnlyFirstStep(page, folderName, iteration)

            return har
        }
    },
    {
        url: healthFormUrl,
        acceptCookies: true,
        fileName: 'sante-confirmation_direct',
        isHar: true,
        function: async(page) => HealthForm(page)
    },
    {
        url: healthFormUrl,
        acceptCookies: false,
        fileName: 'sante-confirmation_direct-no-consent',
        isHar: true,
        function: async(page) => HealthForm(page)
    },
    {
        url: healthHubUrl,
        acceptCookies: true,
        fileName: 'sante-confirmation_lp-hub',
        isHar: true,
        function: async(page) => HealthHub(page) 
    },
    {
        url: autoFormUrl,
        acceptCookies: true,
        fileName: 'auto-tarif-fq_direct',
        isHar: true,
        function: async(page) => AutoFormFq(page)
    },
    {
        url: autoFormUrl,
        acceptCookies: false,
        fileName: 'auto-tarif-fq_direct_no-consent',
        isHar: true,
        function: async(page) => AutoFormFq(page)
    },
    {
        url: nveiFormUrl,
        acceptCookies: true,
        fileName: 'nvei-confirmation_direct',
        isHar: true,
        function: async(page) => NveiFrom(page)
    },
    {
        url: mrhFromUrl,
        acceptCookies: true,
        fileName: 'mrh-fq-confirmation_direct',
        isHar: true,
        function: async(page) => MrhFromFq(page)
    }
]

export default urls