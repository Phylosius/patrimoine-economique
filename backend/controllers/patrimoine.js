import {getDateRange, getPatrimoine} from "../services/patrimoine.js";


export function getValeurPatrimoine(req, res) {
    const date = new Date(req.params.date);
    getPatrimoine().then((patrimoine) => {
        res.json(patrimoine.getValeur(date));
    });
}

export function getPatrimoineRangeByMonth(req, res) {
    const start = new Date(req.body.dateDebut);
    const end = new Date(req.body.dateFin);
    const dateRange = getDateRange(start, end, "month", {dayForMiddle: req.body.jour});

    let json = {};
    getPatrimoine().then((patrimoine) => {
        dateRange.forEach(date => {
            json[date.toISOString()] = patrimoine.getValeur(date);
        })
        res.json(json);
    })
}