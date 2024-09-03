import { readFile, writeFile } from './data.js';
import Possession from '../../models/possessions/Possession.js';
import Argent from '../../models/possessions/Argent.js';
import Flux from '../../models/possessions/Flux.js';
import BienMateriel from '../../models/possessions/BienMateriel.js';
import Personne from '../../models/Personne.js';

const dataPath = "public/data/original-data.json";
const defautPossesseur = new Personne("Anonymous");

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
        possesseur: {
            nom: possession.possesseur.nom
        },
        libelle: possession.libelle,
        valeur: possession.valeur,
        dateDebut: possession.dateDebut ? possession.dateDebut.toISOString() : null,
        dateFin: possession.dateFin ? possession.dateFin.toISOString() : null,
        tauxAmortissement: possession.tauxAmortissement
    };

    if (possession instanceof Argent) {
        json.type = possession.type;
    }

    if (possession instanceof Flux) {
        json.jour = possession.jour;
        json.valeurConstante = possession.valeurConstante;
    }

    return json;
}

function convertJSONToPossession(possessionJSON) {
    const { possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type, jour, valeurConstante } = possessionJSON;
    const possesseurInstance = new Personne(possesseur.nom);

    if (type !== undefined) {
        return new Argent(
            possesseurInstance,
            libelle,
            valeur,
            dateDebut ? new Date(dateDebut) : null,
            dateFin ? new Date(dateFin) : null,
            tauxAmortissement,
            type
        );
    }

    if (jour !== undefined) {
        return new Flux(
            possesseurInstance,
            libelle,
            valeur,
            new Date(dateDebut),
            dateFin ? new Date(dateFin) : null,
            tauxAmortissement,
            jour,
            valeurConstante
        );
    }

    return new BienMateriel(
        possesseurInstance,
        libelle,
        valeur,
        new Date(dateDebut),
        dateFin ? new Date(dateFin) : null,
        tauxAmortissement
    );
}

/**
 * Retourne une liste de toutes les possessions.
 * @return {Promise<Possession[]>} Liste de Possession
 */
async function getPossessionsList() {
    const possessions = await getPossessionsJson();

    return possessions.map(item => convertJSONToPossession(item));
}

/**
 * Retourne une possession
 * @param {string} libelle libelle de la possession
 * @return {Promise<Possession>}
 */
async function getPossession(libelle) {
    const data = await getPossessionsJson();

    const possession = data.find(item => item.libelle === libelle);
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

    const patrimoine = data.find(obj => obj.model === "Patrimoine");
    if (!patrimoine) {
        throw new Error('Patrimoine model not found in data.');
    }

    return patrimoine.data.possessions;
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

    const patrimoine = data.find(obj => obj.model === "Patrimoine");
    if (!patrimoine) {
        throw new Error('Patrimoine model not found in data.');
    }

    const json = convertPossessionToJSON(possession);
    patrimoine.data.possessions.push(json);

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

    const patrimoine = data.find(obj => obj.model === "Patrimoine");
    if (!patrimoine) {
        throw new Error('Patrimoine model not found in data.');
    }

    const updatedData = patrimoine.data.possessions.map(item => {
        if (item.libelle === cibleLibelle) {
            let jresult = {
                possesseur: possession.possesseur ? { nom: possession.possesseur.nom } : item.possesseur,
                libelle: possession.libelle || item.libelle,
                valeur: (possession.valeur != null) ? possession.valeur : item.valeur,
                dateDebut: (possession.dateDebut != null) ? possession.dateDebut.toISOString() : item.dateDebut,
                dateFin: (possession.dateFin != null) ? possession.dateFin.toISOString() : item.dateFin,
                tauxAmortissement: (possession.tauxAmortissement != null) ? possession.tauxAmortissement : item.tauxAmortissement,
            };

            if (possession instanceof Flux) {
                jresult.jour = possession.jour;
                jresult.valeurConstante = possession.valeurConstante;
            } else if (possession instanceof Argent) {
                jresult.type = possession.type;
            }

            return jresult;
        }
        return item;
    });

    patrimoine.data.possessions = updatedData;

    const { status: writeStatus, error: writeError } = await writeFile(dataPath, data);
    if (writeStatus === 'ERROR') {
        throw new Error(`Failed to write file: ${writeError}`);
    }
}

async function createPossession(libelle, valeur, dateDebut, taux) {
    const cache = new Possession(defautPossesseur, libelle, valeur, new Date(dateDebut), null, taux);
    await savePossession(cache);
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

    const patrimoine = data.find(obj => obj.model === "Patrimoine");
    if (!patrimoine) {
        throw new Error('Patrimoine model not found in data.');
    }

    patrimoine.data.possessions = patrimoine.data.possessions.filter(item => item.libelle !== possession.libelle);

    const { status: writeStatus, error: writeError } = await writeFile(dataPath, data);
    if (writeStatus === 'ERROR') {
        throw new Error(`Failed to write file: ${writeError}`);
    }
}

export { getPossessionsList, savePossession, updatePossession, deletePossession, createPossession, getPossessionsJson, getPossession };
