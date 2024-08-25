import {getPatrimoine} from "../services/patrimoine.js";


export function getValeurPatrimoine(req, res) {
    const date = new Date(req.params.date);
    getPatrimoine().then((patrimoine) => {
        res.json(patrimoine.getValeur(date));
    });
}

