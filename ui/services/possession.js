import Argent from "../../models/possessions/Argent.js";
import Personne from "../../models/Personne.js";
import Flux from "../../models/possessions/Flux.js";
import BienMateriel from "../../models/possessions/BienMateriel.js";
import Possession from "../../models/possessions/Possession.js";

export function convertJSONToPossession(possessionJSON){
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