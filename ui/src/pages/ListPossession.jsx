import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListPossession() {
    const [possessions, setPossessions] = useState([]);

    useEffect(() => {
        const fetchPossessions = async () => {
            const response = await axios.get('/possession');
            setPossessions(response.data);
        };

        fetchPossessions();
    }, []);

    const handleClose = async (libelle) => {
        await axios.post(`/possession/${libelle}/close`);
        // Refresh possessions list
    };

    return (
        <div>
            <Link to="/possession/create">Créer Possession</Link>
            <table>
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
                {possessions.map(possession => (
                    <tr key={possession.libelle}>
                        <td>{possession.libelle}</td>
                        <td>{possession.valeur}</td>
                        <td>{possession.dateDebut}</td>
                        <td>{possession.dateFin}</td>
                        <td>{possession.taux}</td>
                        <td>{/* Valeur actuelle */}</td>
                        <td>
                            <Link to={`/possession/${possession.libelle}/update`}>Modifier</Link>
                            <button onClick={() => handleClose(possession.libelle)}>Clôturer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListPossession;
