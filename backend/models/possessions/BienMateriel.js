import Possession from "./Possession.js";

/**
 * Classe representant un bien materiel (Possession physique)
 * */
export default class BienMateriel extends Possession {

  /**
   * @param possesseur {Personne} Personne possesseur du bien matériel
   * @param libelle {String} Petite description du bien matériel
   * @param valeur {number} Valeur du bien matériel
   * @param dateDebut {Date} Date d'obtiention du bien matériel
   * @param dateFin {Date} Date de cloture du bien matériel
   * @param tauxAmortissement {number} Taux d'ammortissement du bien matériel
   * */
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
  }

  /**
   * Retourne la valeur du bien matériel à la date donnée
   *
   * @param date {Date} Date pour le calcul de la valeur du bien matériel
   * @return {number} Valeur du bien matériel à la date donnée
   * */
  getValeur(date) {
    return super.getValeur(date);
  }
}
