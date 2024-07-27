/**
 * Classe qui designe une possession d'une personne
 */
export class Possession {
  /**
   * @param possesseur {Personne} posseseur de la possession
   * @param date {String} date d'accisition
   * @param libelle {String} libelle ou nom de la possession
   * @param value {number} valeur monetaire ou d'échage de la possession
   * @param interet {number} taux d'interet en pourcentage (par defaut annuel)
   * @param interetOccurence jour d'occurence d'application de l'interet
   * */
  constructor(possesseur,
              date,
              libelle="Possession",
              value,
              interet=0,
              interetOccurence=365)
  {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.date = new Date(date);
    this.valeur = value;

    this.interet = interet;
    this.interetDayOccurence = interetOccurence;
    this.interetData = [this.interet, this.interetDayOccurence] // [x, y] --> + x% / yjour
  }

  /**
   * retourne la valeur de l'interet à une date donnée
   * @param _date {String} date de la valeur qu'on veut
   * @param rounded {boolean} indique si on doit arrondir ou pas
   *
   * @return {number}
   * */
  getInterestValue(_date, rounded=false) {
    // day * perday
    const date = new Date(_date);
    const dayBetween = (date - this.date) / (1000 * 60 * 60 * 24);
    const perDayPercent = (this.interet / 100) / this.interetDayOccurence
    const perDayValeur = perDayPercent * this.valeur;

    const result = perDayValeur * dayBetween;
    return rounded ? Math.round(result): result;
  }

  /**
   * Retourne la valeur de la possession à une date donnée
   *
   * @param _date {String} date de la valeur qu'on veut
   * @param rounded {boolean} indique si on doit arrondir ou pas
   *
   * @return {number}
   * */
  getValeur(_date, rounded=false) {
    const result = this.valeur + this.getInterestValue(_date, rounded)

    return rounded ? Math.round(result) : result;
  }

  /**
   * applique l'interet
   * @param _date {String} date d'application
   * @param rounded {boolean} indique si on doit arrondir ou pas
   * */
  applyInterest(_date, rounded=false) {
    if (this.valeur + this.getInterestValue(_date) >= 0) {
      this.valeur += this.getInterestValue(_date, rounded)
    }
    else {
      this.valeur = 0;
    }
  }

  /**
   * change la valeur à la date actuel selon l'interet
   * @param _date {String} date d'application
   * @param rounded {boolean} indique si on doit arrondir ou pas
   * */
  updateValeur(_date, rounded=false) {
    this.applyInterest(_date, rounded)
  }
}


/**
 * Classe qui designe l'argent
 * */
export class Argent extends Possession {
  /**
   * @param possesseur {Personne} possesseur de l'argent
   * @param valeur {int} valeur de l'argent
   * @param date {String} date d'accisition de l'argent
   * @param inflation {int} pourcentage d'inflation (par inflationOccurence)
   * @param inflationOccurence occurence en jours d'application de l'inflation
   * */
  constructor(possesseur, valeur, date, inflation=0, inflationOccurence=365 ) {
    super(possesseur, date, 'argent', valeur, -inflation, inflationOccurence);
  }
}


export class Salaire extends Argent {
  constructor(possesseur, valeurMonsuel, date) {
    super(possesseur, valeurMonsuel, date, -100, 30);
  }
}