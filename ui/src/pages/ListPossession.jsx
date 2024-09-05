import { useState, useEffect } from 'react';
import axios from '../axiosConfig.js';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PossessionTable from '../components/presentational/PossessionTable';
import { convertJSONToPossession } from "../../services/possession.js";

function ListPossession() {
    const [possessions, setPossessions] = useState([]);

    const fetchPossessions = async () => {
        const response = await axios.get('/possession');
        const cp = response.data.map(pss => convertJSONToPossession(pss));
        setPossessions(cp);
    };

    useEffect(() => {
        fetchPossessions();
    }, []);

    const handleClose = async (libelle) => {
        await axios.post(`/possession/${libelle}/close`);
        await fetchPossessions();
    };

    return (
        <div className="container">
            <Link to="/possession/create">
                <Button variant="primary" className="mb-3">Créer Possession</Button>
            </Link>
            <PossessionTable possessions={possessions} handleClose={handleClose} />
        </div>
    );
}

export default ListPossession;
