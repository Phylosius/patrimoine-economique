import Possession from "./Possession.js";

/**
 * Type d'Argent possible
 * */
const TYPE_ARGENT = {
  Courant: "Courant",
  Epargne: "Epargne",
  Espece: "Espece"
};

/**
 * Classe representant d'Argent (Valeur monétaire)
 * */
export default class Argent extends Possession {
  /**
   * @param possesseur {Personne} Personne possesseur de l'argent
   * @param libelle {String} Petite description de l'argent
   * @param valeur {number} Valeur de l'argent
   * @param dateDebut {Date} Date d'obtention de l'argent
   * @param dateFin {Date} Date de cloture de l'argent
   * @param tauxAmortissement {int} Taux d'ammortissement de l'argent
   * @param type {TYPE_ARGENT} Type de l'argent
   * */
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    try {
      /*if (!TYPE_ARGENT.values().includes(type)) {
        throw new Error("Type d'argent invalide");
      }*/
      this.type = type;
    }
    catch (e) {
      console.error(e);
    }
  }
}
