import express from 'express';
import {createPossession, getPossessionsJson, updatePossession} from "../services/possession.js";
import Possession from "../../models/possessions/Possession.js";
import Personne from "../../models/Personne.js";
import Flux from "../../models/possessions/Flux.js";
import Argent from "../../models/possessions/Argent.js";
import BienMateriel from "../../models/possessions/BienMateriel.js";
import {updatePossessionByRequest} from "../controllers/possession.js";
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
    updatePossessionByRequest(req, res);
})

router.post('/:libelle/close', (req, res) => {

})

export default router;