import getPatrimoine from "../services/patrimoine.js";


export function getValeurPatrimoine(req, res) {
    const date = new Date(req.params.date);
    res.send(getPatrimoine().getValeur(date))
}

