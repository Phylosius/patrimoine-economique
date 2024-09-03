import Argent from "../../models/possessions/Argent.js";
import Personne from "../../models/Personne.js";
import Flux from "../../models/possessions/Flux.js";
import BienMateriel from "../../models/possessions/BienMateriel.js";

export function convertJSONToPossession(possessionJSON) {
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
            valeurConstante,
            new Date(dateDebut),
            dateFin ? new Date(dateFin) : null,
            tauxAmortissement,
            jour
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