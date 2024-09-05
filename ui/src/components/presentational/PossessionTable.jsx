import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PossessionTable({ possessions, handleClose }) {
    return (
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
                {possessions.length > 0 ? possessions.map(possession => (
                    <tr key={possession.libelle}>
                        <td>{possession.libelle}</td>
                        <td>{possession.valeurConstante ? possession.valeurConstante : possession.valeur}</td>
                        <td>{possession.dateDebut ? possession.dateDebut.toLocaleDateString() : null}</td>
                        <td>{possession.dateFin ? possession.dateFin.toLocaleDateString() : null}</td>
                        <td>{possession.tauxAmortissement}</td>
                        <td>{possession.getValeur(new Date())}</td>
                        <td>
                            <Link to={`/possession/${possession.libelle}/update`} state={possession}>
                                <Button variant="warning" className="me-2">Modifier</Button>
                            </Link>
                            <Button variant="danger" onClick={() => handleClose(possession.libelle)}>Clôturer</Button>
                        </td>
                    </tr>
                )) : (
                    <tr><td colSpan="7">Aucune possession enregistrée</td></tr>
                )}
            </tbody>
        </Table>
    );
}

export default PossessionTable;
