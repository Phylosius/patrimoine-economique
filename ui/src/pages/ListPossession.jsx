import { useState, useEffect } from 'react';
import axios from '../axiosConfig.js';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import Possession from "../../../models/possessions/Possession.js";
import Personne from "../../../models/Personne.js";
import {convertJSONToPossession} from "../../services/possession.js";

function ListPossession() {
    const [possessions, setPossessions] = useState([]);

    const fetchPossessions = async () => {
        const response = await axios.get('/possession');
        console.log(response.data)
        const cp = []
        response.data.forEach(pss => {
            cp.push(convertJSONToPossession(pss));
        })
        setPossessions(cp);
    };

    useEffect(() => {
        fetchPossessions();
    }, []);

    const handleClose = async (libelle) => {
        await axios.post(`/possession/${libelle}/close`);
        await fetchPossessions()
    };

    return (
        <div className="container">
            <Link to="/possession/create">
                <Button variant="primary" className="mb-3">Créer Possession</Button>
            </Link>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Libelle</th>
                    <th>Valeur</th>
                    <th>Date Début</th>
                    <th>Date Fin</th>
                    <th>Taux</th>
                    <th>Valeur Actuelle</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    possessions.length > 0 ? possessions.map(possession => (
                    <tr key={possession.libelle}>
                        <td>{possession.libelle}</td>
                        <td>{possession.valeurConstante ? possession.valeurConstante: possession.valeur}</td>
                        <td>{possession.dateDebut ? possession.dateDebut.toLocaleString() : null}</td>
                        <td>{possession.dateFin ? possession.dateFin.toLocaleString() : null}</td>
                        <td>{possession.tauxAmortissement}</td>
                        <td>{possession.getValeur(new Date())}</td>
                        <td>
                            <Link
                                to={`/possession/${possession.libelle}/update`}
                                state={possession}
                            >
                                <Button variant="warning" className="me-2">Modifier</Button>
                            </Link>
                            <Button variant="danger" onClick={() => handleClose(possession.libelle)}>Clôturer</Button>
                        </td>
                    </tr>
                    )) : (<tr><td>Aucune possession enregisté</td></tr>) }
                </tbody>
            </Table>
        </div>
    );
}

export default ListPossession;
