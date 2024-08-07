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
                    <Tableau tHeader={["libelle", "valeur", "dateDebut", "dateFin", "tauxAmortissement", "valeurActuel"]} tBody={getPossessions(myData.possessions)}/>
                    <PatrimoineCalc />
                </>
                : "loading..."
        }
    </>
    )
}

export default App
