import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatePossession() {
    const { libelle } = useParams();
    const [dateFin, setDateFin] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch current data for libelle
    }, [libelle]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/possession/${libelle}/update`, { dateFin });
        navigate('/possession');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
            <button type="submit">Mettre à jour</button>
        </form>
    );
}

export default UpdatePossession;
