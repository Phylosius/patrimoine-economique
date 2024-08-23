import express from 'express';
import {createPossession, getPossessionList, updatePossession} from "../services/possession.js";
import Possession from "../../models/possessions/Possession.js";
const router = express.Router();

router.get('/', (req, res) => {
    getPossessionList().then((possessionList) => {
        res.send(possessionList);
    })
})

router.post('/', (req, res) => {
    createPossession(
        req.body.libelle,
        req.body.valeur,
        req.body.dateDebut,
        req.body.taux
    ).then(()=>{
        res.sendStatus(200);
    })
})

router.post('/:libelle', (req, res) => {
    const cibleLibelle = req.params.libelle;
    updatePossession(cibleLibelle, new Possession(req.body.possesseur, req.body.libelle, req.body.valeur, req.body.dateDebut, req.body.dateFin, req.body.tauxAmortissement))
        .then(() => {
            res.sendStatus(200);
        }
    )

    console.log(req.body.libelle)
})

export default router;