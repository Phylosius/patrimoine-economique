import express from 'express';
import {createPossession, getPossessionList} from "../services/possession.js";
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

export default router;