import express from 'express';
import {createPossession, getPossessionsJson, updatePossession} from "../services/possession.js";
import Possession from "../../models/possessions/Possession.js";
import Personne from "../../models/Personne.js";
import Flux from "../../models/possessions/Flux.js";
import Argent from "../../models/possessions/Argent.js";
import BienMateriel from "../../models/possessions/BienMateriel.js";
const router = express.Router();

router.get('/', (req, res) => {
    getPossessionsJson().then((possessionList) => {
        res.send(possessionList);
    })
})

router.post('/', (req, res) => {
    if (!req.params.model) {
        createPossession(
            req.body.libelle,
            req.body.valeur,
            req.body.dateDebut,
            req.body.taux
        ).then(()=>{res.sendStatus(200);})
    }

})

router.post('/:libelle', (req, res) => {
    const cibleLibelle = req.params.libelle;
    if (cibleLibelle) {

        if (!req.params.model) {
            updatePossession(cibleLibelle, new Possession(req.body.possesseur, req.body.libelle, req.body.valeur, req.body.dateDebut, req.body.dateFin, req.body.tauxAmortissement))
                .then(() => {res.sendStatus(200);})
        } else {
            if (req.params.model === "Flux") {
                updatePossession(cibleLibelle, new Flux(
                    new Personne(req.body.possesseur.name),
                    req.body.libelle,
                    req.body.valeur,
                    req.body.dateDebut,
                    req.body.dateFin,
                    req.body.tauxAmortissement,
                    req.body.jour
                )).then(() => {res.sendStatus(200);})
            } else if (req.params.model === "Argent") {
                updatePossession(cibleLibelle, new Argent(
                    new Personne(req.body.possesseur.name),
                    req.body.libelle,
                    req.body.valeur,
                    req.body.dateDebut,
                    req.body.dateFin,
                    req.body.tauxAmortissement,
                    req.body.type
                )).then(() => {res.sendStatus(200);})
            } else if (req.params.model === "BienMateriel") {
                updatePossession(cibleLibelle, new BienMateriel(
                    new Personne(req.body.possesseur.name),
                    req.body.libelle,
                    req.body.valeur,
                    req.body.dateDebut,
                    req.body.dateFin,
                    req.body.tauxAmortissement
                )).then(() => {res.sendStatus(200);})
            }
        }

    } else {
        res.sendStatus(400)
    }


    console.log(req.body.libelle)
})

export default router;