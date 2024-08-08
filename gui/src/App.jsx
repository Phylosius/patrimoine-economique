import {useEffect, useState} from 'react'
import './App.css'
// boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Tableau from "./components/Tableau.jsx";
import PatrimoineCalc from "./components/PatrimoineCalc.jsx";
import {readJsonFile} from "../services/data.js";
import {getPossessions} from "../services/possessions.js";


function App() {

    let [myData, setMyData] = useState();

    readJsonFile('/data/fake-data.json')
        .then(data => {setMyData(data);})
        .catch(reason => {
            throw reason
        })

    return (
    <>
        {
            myData ?
                <>
                    <h4 className={""}>Possessions et Patrimoine</h4>

                    <Tableau
                        tHeader={["Libelle", "Valeur", "Date debut", "Date fin", "taux d'amortissement", "valeur actuel"]}
                        tBody={getPossessions(myData.possessions)}/>
                    <PatrimoineCalc possessions={getPossessions(myData.possessions)}/>
                </>
                : "loading..."
        }
    </>
    )
}

export default App
