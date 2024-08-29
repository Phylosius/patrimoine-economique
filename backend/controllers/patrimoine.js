import {getDateRange, getPatrimoine} from "../services/patrimoine.js";


export function getValeurPatrimoine(req, res) {
    const date = new Date(req.params.date);
    getPatrimoine().then((patrimoine) => {
        res.json(patrimoine.getValeur(date));
    });
}

export function getPatrimoineRangeByMonth(req, res) {
    // Récupération des paramètres à partir de req.query pour une requête GET
    const start = new Date(req.query.dateDebut);
    const end = new Date(req.query.dateFin);
    const dateRange = getDateRange(start, end, "month", { dayForMiddle: req.query.jour });

    let json = {};
    getPatrimoine().then((patrimoine) => {
        dateRange.forEach(date => {
            json[date.toISOString()] = patrimoine.getValeur(date);
        });
        res.json(json);
    }).catch(error => {
        console.error('Erreur lors de la récupération du patrimoine:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    });
}
