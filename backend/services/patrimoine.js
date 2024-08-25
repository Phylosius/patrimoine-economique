import Patrimoine from "../../models/Patrimoine.js";
import {getPossessionsList} from "./possession.js";


export default function getPatrimoine() {
    let possessions;
    getPossessionsList().then(possessionsList => {
        possessions = possessionsList;
    });

    return new Patrimoine(possessions[0].possesseur, possessions);
}

