import Patrimoine from "../../../models/Patrimoine.js";

export default function PatrimoineCalc (props) {

    return (
        <>
            <div>
                <h1>Evaluer valeur de patrimoine</h1>
                <input type={"date"} placeholder={"Date"} onChange={props.onChange} value={props.value}/>
                <button type="submit">eval</button>
            </div>
            <div>
                valeur du patrimoine selon la date: {props.result}
            </div>
        </>
    )
}