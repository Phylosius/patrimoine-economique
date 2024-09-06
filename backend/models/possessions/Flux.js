import Possession from "./Possession.js";

/**
 * Classe representant un Flux d'argent (Argent dépensé ou gagné à chaque intervale de temps)
 * */
export default class Flux extends Possession {
  /**
   * @param possesseur {Personne} Personne possesseur du flux
   * @param libelle {String} Petite description du flux
   * @param valeur {number} Valeur du flux
   * @param dateDebut {Date} Date de debut de cycle du flux
   * @param dateFin {Date} Date de cloture du flux
   * @param tauxAmortissement {int} Taux d'ammortissement du flux
   * @param jour {number} Nombre de jour pour un cycle (jour d'application)
   * */
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement)
    this.valeur = 0;
    this.jour = jour;
    // this.source = source; // null || Compte
    // this.destination = destination; // Compte
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.valeurConstante = valeur
  }

  /**
   * Retourne la valeur du flux à la date donnée
   *
   * @param date {Date} Date pour le calcul de la valeur du flux
   * @return {number} Valeur du flux à la date donnée
   * */
  getValeur(date) {
    const nombreDeMois = (debut, dateEvaluation, jourJ) => {
      let compteur = 0;

      if (debut.getDate() < jourJ) {
        compteur++;
      }

      if (dateEvaluation.getDate() >= jourJ && !(debut.getFullYear() === dateEvaluation.getFullYear() && debut.getMonth() === dateEvaluation.getMonth())) {
        compteur++;
      }

      let totalMois = (dateEvaluation.getFullYear() - debut.getFullYear()) * 12 + (dateEvaluation.getMonth() - debut.getMonth()) - 1;

      compteur += Math.max(0, totalMois);

      return compteur;
    };

    // Calculer le montant total sans modifier this.valeur
    const totalMois = nombreDeMois(this.dateDebut, date, this.jour);
    return totalMois * this.valeurConstante;
  }
}