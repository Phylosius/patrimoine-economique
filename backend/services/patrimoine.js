import Patrimoine from "../../models/Patrimoine.js";
import {getPossessionsList} from "./possession.js";


export async function getPatrimoine() {
    let possessions = await getPossessionsList()
    return new Patrimoine(possessions[0].possesseur, possessions);
}

