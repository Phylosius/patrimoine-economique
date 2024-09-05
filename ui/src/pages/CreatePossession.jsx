import { useState } from 'react';
import axios from '../axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import PossessionForm from '../components/presentational/PossessionForm';

function CreatePossession() {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [taux, setTaux] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/possession', { libelle, valeur, dateDebut, taux });
        navigate('/possession');
    };

    return (
        <PossessionForm
            libelle={libelle}
            setLibelle={setLibelle}
            valeur={valeur}
            setValeur={setValeur}
            dateDebut={dateDebut}
            setDateDebut={setDateDebut}
            taux={taux}
            setTaux={setTaux}
            handleSubmit={handleSubmit}
        />
    );
}

export default CreatePossession;
