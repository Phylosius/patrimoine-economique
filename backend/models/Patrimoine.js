/**
 * Représentation logique d'un patrimoine (ensemble de possession d'une personne)
 * */
export default class Patrimoine {
  /**
   * @param possesseur {Personne} Personne possesseur du patrimoine
   * @param possessions {Possession[]} Liste des possessions inclus dans le patrimoine
   * */
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = [...possessions]; // [Possession, Possession, ...]
  }

  /**
   * Retourne la valeur du patrimoine à la date donnée
   *
   * @param date {Date} Date pour le calcul de la valeur du patrimoine
   * @return {number} Valeur du patrimoine à la date donnée
   * */
  getValeur(date) {
    let result = 0;
    for (const item of this.possessions) {
      result += item.getValeur(date);
    }
    return result;
  }

  /**
   * Ajoute une possession donnée aux possessions du patrimoine courant
   *
   * @param possession {Possession} Possession à ajouter
   * */
  addPossession(possession) {
    if (possession.possesseur !== this.possesseur) {
      console.log(
        `${possession.libelle} n'appartient pas à ${this.possesseur}`,
      );
    } else {
      this.possessions.push(possession);
    }
  }

  /**
   * Enlève une possession donnée aux possessions du patrimoine courant
   *
   * @param possession {Possession} Possession à enlever
   * */
  removePossession(possession) {
    this.possessions = this.possessions.filter(
      (p) => p.libelle !== possession.libelle,
    );
  }
}
