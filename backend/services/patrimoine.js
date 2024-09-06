import Patrimoine from "../models/Patrimoine.js";
import {getPossessionsList} from "./possession.js";


export async function getPatrimoine() {
    let possessions = await getPossessionsList()
    return new Patrimoine(possessions[0].possesseur, possessions);
}

function getDatesByMonth(startDate, endDate, dayForMiddle = null, endIncluded = true) {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        dayForMiddle ? currentDate.setDate(dayForMiddle): null;
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    endIncluded === true ? dates.push(endDate) : null;

    return dates;
}

export function getDateRange(start, end, by="month", params ={dayForMiddle : null}) {
    if (by === "month") {
        return getDatesByMonth(start, end, params.dayForMiddle);
    }
}

export function getMonthBetween(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return endDate.getMonth() - startDate.getMonth();
}

export function getMonthBetweenDate(start, end) {
    return getMonthBetween(start.toISOString(), end.toISOString());
}
