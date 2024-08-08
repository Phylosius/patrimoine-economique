import Patrimoine from "../../../models/Patrimoine.js";
import {useEffect, useState} from "react";
import Personne from "../../../models/Personne.js";
import {Button} from "react-bootstrap";

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
            <div className={"container"}>
                <div className={"d-flex"}>
                    {/*<h1>Evaluer valeur de patrimoine</h1>*/}
                    <input className={"form-control"} type={"date"} placeholder={"Date d'ammortissement"} onChange={inputOnChange} value={selectedDate}/>
                    <Button type="submit" onClick={buttonClick}>eval</Button>
                </div>
                <div className={"d-flex flex-row justify-content-between"}>
                    <div className={"d-flex"}>
                        <input className={"form-check-input"} type="checkbox" name="isRounded" id="isRounded"
                               onChange={checkOnChange}/>
                        <label className={"form-check-label"} htmlFor="isRounded">arrondir</label>
                    </div>
                    <div className={"d-flex"}>
                        valeur du patrimoine selon la date:
                        <span
                            className={
                                patrimoineValue === 0 ? "text-primary":
                                patrimoineValue > 0 ? "text-success" : "text-danger"
                        }>{patrimoineValue}</span>
                    </div>
                </div>
            </div>
        </>
    )
}