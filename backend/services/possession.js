import { readFile, writeFile } from './data.js';
import Possession from '../../models/possessions/Possession.js';
import Argent from '../../models/possessions/Argent.js';
import Flux from '../../models/possessions/Flux.js';
import BienMateriel from '../../models/possessions/BienMateriel.js';
import Patrimoine from '../../models/Patrimoine.js';
import Personne from '../../models/Personne.js';

const dataPath = "public/data/data.json"
const defautPossesseur = new Personne("Anonymous")

/**
 * Convertit une instance de Possession en un objet JSON.
 * @param {Possession} possession L'objet Possession à convertir
 * @return {Object} Représentation JSON de la possession
 */
function convertPossessionToJSON(possession) {
    if (!(possession instanceof Possession)) {
        throw new TypeError('Provided object is not an instance of Possession.');
    }

    let json = {
        model: possession.constructor.name,
        data: {
            possesseur: {
                nom: possession.possesseur.nom
            },
            libelle: possession.libelle,
            valeur: possession.valeur,
            dateDebut: possession.dateDebut ? possession.dateDebut.toISOString() : null,
            dateFin: possession.dateFin ? possession.dateFin.toISOString() : null,
            tauxAmortissement: possession.tauxAmortissement
        }
    };

    if (possession instanceof Argent) {
        json.data.type = possession.type;
    }

    if (possession instanceof Flux) {
        json.data.jour = possession.jour;
        json.data.valeurConstante = possession.valeurConstante;
    }

    return json;
}

function convertJSONToPossession(possessionJSON){
    const {model, data: possessionData} = possessionJSON;

    let possession;
    switch (model) {
        case 'Argent':
            possession = new Argent(
                new Personne(possessionData.possesseur.nom),
                possessionData.libelle,
                possessionData.valeur,
                new Date(possessionData.dateDebut),
                possessionData.dateFin ? new Date(possessionData.dateFin) : null,
                possessionData.tauxAmortissement,
                possessionData.type
            );
            break;
        case 'Flux':
            possession = new Flux(
                new Personne(possessionData.possesseur.nom),
                possessionData.libelle,
                possessionData.valeur,
                new Date(possessionData.dateDebut),
                possessionData.dateFin ? new Date(possessionData.dateFin) : null,
                possessionData.tauxAmortissement,
                possessionData.jour
            );
            break;
        case 'BienMateriel':
            possession = new BienMateriel(
                new Personne(possessionData.possesseur.nom),
                possessionData.libelle,
                possessionData.valeur,
                new Date(possessionData.dateDebut),
                possessionData.dateFin ? new Date(possessionData.dateFin) : null,
                possessionData.tauxAmortissement
            );
            break;
        case 'Possession':
            possession = new Possession(
                new Personne(possessionData.possesseur.nom),
                possessionData.libelle,
                possessionData.valeur,
                new Date(possessionData.dateDebut),
                possessionData.dateFin ? new Date(possessionData.dateFin) : null,
                possessionData.tauxAmortissement
            );
            break;
        default:
            throw new Error(`Unknown model: ${model}`);
    }

    return possession;
}

/**
 * Retourne une liste de toutes les possessions.
 * @return {Promise<Possession[]>} Liste de Possession
 */
async function getPossessionsList() {
    const { status, data, error } = await readFile(dataPath);
    if (status === 'ERROR') {
        throw new Error(`Failed to read file: ${error}`);
    }

    return data.map((item) => convertJSONToPossession(item));
}

/**
 * Retourne une possession
 * @param {string} libelle libelle de la possession
 * @return {Promise<Possession>}
 * */
async function getPossession(libelle){
    const data = await getPossessionsJson();
    const possession = data.filter(possession => possession.data.libelle === libelle)[0];

    // console.log(possession)
    return possession ? convertJSONToPossession(possession) : null;
}

/**
 * Retourne le json des possessions
 * */
async function getPossessionsJson() {
    const { status, data, error } = await readFile(dataPath);
    if (status === 'ERROR') {
        throw new Error(`Failed to read file: ${error}`);
    }
    return data;
}

/**
 * Enregistre une possession.
 * @param {Possession} possession Possession à enregistrer
 * @return {Promise<void>}
 */
async function savePossession(possession) {
    const { status, data, error } = await readFile(dataPath);
    if (status === 'ERROR') {
        throw new Error(`Failed to read file: ${error}`);
    }

    const json = convertPossessionToJSON(possession);
    data.push(json);

    const { status: writeStatus, error: writeError } = await writeFile(dataPath, data);
    if (writeStatus === 'ERROR') {
        throw new Error(`Failed to write file: ${writeError}`);
    }
}

/**
 * Met à jour les propriétés d'une possession.
 * @param cibleLibelle
 * @param {Possession} possession Possession à mettre à jour
 * @return {Promise<void>}
 */
async function updatePossession(cibleLibelle, possession) {
    const { status, data, error } = await readFile(dataPath);
    if (status === 'ERROR') {
        throw new Error(`Failed to read file: ${error}`);
    }

    const updatedData = data.map((item) => {
        if (item.data.libelle === cibleLibelle) {

            let jresult = {
                model: possession.constructor.name,
                data: {
                    possesseur: !possession.possesseur ? item.data.possesseur : {
                        nom: possession.possesseur.nom
                    },
                    libelle: possession.libelle || item.data.libelle,
                    valeur: possession.valeur != null ? possession.valeur : item.data.valeur,
                    dateDebut: possession.dateDebut != null ? possession.dateDebut.toISOString() : item.data.dateDebut,
                    dateFin: possession.dateFin != null ? possession.dateFin.toISOString() : item.data.dateFin,
                    tauxAmortissement: possession.tauxAmortissement != null ? possession.tauxAmortissement : item.data.tauxAmortissement,
                }
            }

            if (possession instanceof Flux) {
                jresult.data.jour = possession.jour
                jresult.data.valeurConstante = possession.valeurConstante
            } else if (possession instanceof Argent) {
                jresult.data.type = possession.type
            }

            return jresult
        }
        return item;
    });

    const { status: writeStatus, error: writeError } = await writeFile(dataPath, updatedData);
    if (writeStatus === 'ERROR') {
        throw new Error(`Failed to write file: ${writeError}`);
    }
}

async function createPossession(libelle, valeur, dateDebut, taux) {
    const cache = new Possession(defautPossesseur, libelle, valeur, new Date(dateDebut), null, taux);
    await savePossession(cache)
    return cache;
}

/**
 * Supprime une possession.
 * @param {Possession} possession Possession à supprimer
 * @return {Promise<void>}
 */
async function deletePossession(possession) {
    const { status, data, error } = await readFile(dataPath);
    if (status === 'ERROR') {
        throw new Error(`Failed to read file: ${error}`);
    }

    const updatedData = data.filter((item) => {
        return !(item.data.libelle === possession.libelle);
    });

    const { status: writeStatus, error: writeError } = await writeFile(dataPath, updatedData);
    if (writeStatus === 'ERROR') {
        throw new Error(`Failed to write file: ${writeError}`);
    }
}

export { getPossessionsList, savePossession, updatePossession, deletePossession, createPossession, getPossessionsJson, getPossession };
