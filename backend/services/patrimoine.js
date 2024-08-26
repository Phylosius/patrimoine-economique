import Patrimoine from "../../models/Patrimoine.js";
import {getPossessionsList} from "./possession.js";


export async function getPatrimoine() {
    let possessions = await getPossessionsList()
    return new Patrimoine(possessions[0].possesseur, possessions);
}

export function getDateRange(start, end, by="month", dayForMiddle = null) {
    let dates = [];
    if (by === "month") {
        const monthBetween = getMonthBetween(start, end);

        dates.push(start);
        for (let i = 1; i <= monthBetween; i++) {
            const date = new Date((new Date(start)).setMonth(start.getMonth() + i));
            dayForMiddle ? date.setDate(dayForMiddle): null;
            dates.push(date);
        }
        dates.push(end);
    }

    return dates;
}

export function getMonthBetween(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    return endDate.getMonth() - startDate.getMonth();
}

export function getMonthBetweenDate(start, end) {
    return getMonthBetween(start.toISOString(), end.toISOString());
}
