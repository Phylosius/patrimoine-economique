import Patrimoine from "../../../models/Patrimoine.js";
import {useEffect, useState} from "react";
import Personne from "../../../models/Personne.js";

export default function PatrimoineCalc (props) {

    const possesseur = new Personne("John Doe")
    const patrimoine = new Patrimoine(possesseur, props.possessions);

    const [dateValue, setDateValue] = useState(new Date());
    const [patrimoineValue, setPatrimoineValue] = useState(0);
    const [selectedDate, setSelectedDate] = useState("");
    const [isRounded, setIsRounded] = useState(false);

    useEffect(()=>{
        const value = isRounded ? Math.round(patrimoine.getValeur(dateValue)) : patrimoine.getValeur(dateValue);
        setPatrimoineValue(value);
    }, [dateValue, isRounded])

    const inputOnChange = (event) => {
        // reevaluer la valeur de la possession
        setSelectedDate(event.target.value);
    }

    const buttonClick = (event) => {
        setDateValue(new Date(selectedDate));
    }

    const checkOnChange = () => {
        setIsRounded(!isRounded);
    }


    return (
        <>
            <div>
                <h1>Evaluer valeur de patrimoine</h1>
                <input type={"date"} placeholder={"Date"} onChange={inputOnChange} value={selectedDate}/>
                <button type="submit" onClick={buttonClick}>eval</button>
            </div>
            <div>
                <input type="checkbox" name="isRounded" id="isRounded" onChange={checkOnChange}/><
                label htmlFor="isRounded">arrondir</label>
            </div>
            <div>
                valeur du patrimoine selon la date: {patrimoineValue}
            </div>
        </>
    )
}