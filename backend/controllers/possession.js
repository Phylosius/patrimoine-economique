import {getPossession, savePossession, updatePossession} from "../services/possession.js";
import Possession from "../models/possessions/Possession.js";
import Flux from "../models/possessions/Flux.js";
import Personne from "../models/Personne.js";
import Argent from "../models/possessions/Argent.js";
import BienMateriel from "../models/possessions/BienMateriel.js";

export function updatePossessionByRequest(req,res){
    const cibleLibelle = req.params.libelle;
    if (cibleLibelle) {

        if (!req.params.model) {
            const ddebut = req.body.dateDebut ? new Date(req.body.dateDebut) : null;
            const dfin = req.body.dateDebut ? new Date(req.body.dateFin) : null;
            console.log(req.body.valeur)
            updatePossession(
                cibleLibelle,
                new Possession(
                    req.body.possesseur,
                    req.body.libelle,
                    req.body.valeur,
                    ddebut,
                    dfin,
                    req.body.tauxAmortissement))
                .then(() => {res.sendStatus(200);})
        } else {
            const ddebut = new Date(req.body.data.dateDebut);
            const dfin = new Date(req.body.dateFin);

            if (req.params.model === "Flux") {
                updatePossession(cibleLibelle, new Flux(
                    new Personne(req.body.possesseur.name),
                    req.body.data.libelle,
                    req.body.data.valeur,
                    ddebut,
                    dfin,
                    req.body.data.tauxAmortissement,
                    req.body.data.jour
                )).then(() => {res.sendStatus(200);})
            } else if (req.params.model === "Argent") {
                updatePossession(cibleLibelle, new Argent(
                    new Personne(req.body.possesseur.name),
                    req.body.data.libelle,
                    req.body.data.valeur,
                    req.body.data.dateDebut,
                    req.body.data.dateFin,
                    req.body.data.tauxAmortissement,
                    req.body.data.type
                )).then(() => {res.sendStatus(200);})
            } else if (req.params.model === "BienMateriel") {
                updatePossession(cibleLibelle, new BienMateriel(
                    new Personne(req.body.possesseur.name),
                    req.body.data.libelle,
                    req.body.data.valeur,
                    req.body.data.dateDebut,
                    req.body.data.dateFin,
                    req.body.data.tauxAmortissement
                )).then(() => {res.sendStatus(200);})
            }
        }

    } else {
        res.sendStatus(400)
    }
}

export function closePossession(req,res){
    if (req.params.libelle !== "") {
        getPossession(req.params.libelle)
            .then((pss) => {
                return new Promise((resolve,) => {
                    pss.dateFin = new Date()
                    updatePossession(pss.libelle, pss)
                        .then(()=>{resolve("success")})
                })
            })
            .then((m) => {
                res.json({"message": m})
            });
    }
}