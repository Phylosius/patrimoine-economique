import Possession from "../../models/possessions/Possession.js";

/**
 * @param {{}} obj
 * @return {Possession[]}
 * */
export function getPossessions(obj) {
    let result = [];

    obj.forEach((p) => {
        const cachePoss = new Possession(
            p.possesseur,
            p.libelle,
            p.valeur,
            new Date(p.dateDebut),
            new Date(p.dateFin),
            p.tauxAmortissement
        );

        result.push(cachePoss);
    });

    return result;
}
