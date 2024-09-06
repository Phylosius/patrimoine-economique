import Personne from "../Personne.js";

/**
 * Class representant une Possession
 * */
export default class Possession {
  /**
   * @param possesseur {Personne} Personne possesseur de la possession
   * @param libelle {String} Petite description de la possession
   * @param valeur {number} Valeur de la possession
   * @param dateDebut {Date} Date d'obtention de la possession
   * @param dateFin {Date} Date de cloture de la possession
   * @param tauxAmortissement {int} Taux d'ammortissement de la possession
   * */
  constructor(possesseur = new Personne("Anonymous"), libelle = "Possession"+ (new Date()).getTime(), valeur , dateDebut = null, dateFin = null, tauxAmortissement ) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.tauxAmortissement = tauxAmortissement;
  }

  /**
   * Retourne la valeur de la possession à la date donnée
   *
   * @param date {Date} Date pour le calcul de la valeur de la possession
   * @return {number} Valeur de la possession à la date donnée
   * */
  getValeur(date) {
    return this.getValeurApresAmortissement(date);
  }

  /**
   * Retourne la valeur de la possession à une date donné en tenant compte de son taux d'ammortissement
   *
   * @param dateActuelle {Date} Date d'application de l'ammortissement
   * @return {number}
   * */
  getValeurApresAmortissement(dateActuelle) {
    if (!(dateActuelle < this.dateDebut)) {

      const differenceDate = {
        year: dateActuelle.getFullYear() - this.dateDebut.getFullYear(),
        month: dateActuelle.getMonth() - this.dateDebut.getMonth(),
        day: dateActuelle.getDate() - this.dateDebut.getDate(),
      };

      const raison = differenceDate.year + differenceDate.month / 12 + differenceDate.day / 365;
      const result =  this.valeur - this.valeur * (raison * (this.tauxAmortissement || 0) / 100);

      if (result >= 0) {
        return result
      }
    }

    return 0


  }
}
