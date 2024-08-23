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

/**
 * Retourne une liste de toutes les possessions.
 * @return {Promise<Possession[]>} Liste de Possession
 */
async function getPossessionList() {
    const { status, data, error } = await readFile(dataPath);
    if (status === 'ERROR') {
        throw new Error(`Failed to read file: ${error}`);
    }

    return data.map((item) => {
        const { model, data: possessionData } = item;
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
            default:
                // throw new Error(`Unknown model: ${model}`);
        }

        return possession;
    });
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
            return {
                model: possession.constructor.name,
                data: {
                    possesseur: !possession.possesseur ? item.data.possesseur : {
                        nom: possession.possesseur.nom
                    },
                    libelle: possession.libelle || item.data.libelle,
                    valeur: possession.valeur != null ? possession.valeur : item.data.valeur,
                    dateDebut: possession.dateDebut ? possession.dateDebut.toISOString() : item.data.dateDebut,
                    dateFin: possession.dateFin ? possession.dateFin.toISOString() : item.data.dateFin,
                    tauxAmortissement: possession.tauxAmortissement != null ? possession.tauxAmortissement : item.data.tauxAmortissement
                }
            }
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

export { getPossessionList, savePossession, updatePossession, deletePossession, createPossession };
