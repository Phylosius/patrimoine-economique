import { useState, useEffect } from 'react';
import axios from '../axiosConfig.js';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import UpdatePossessionForm from '../components/presentational/UpdatePossessionForm';

function UpdatePossession() {
    const { libelle } = useParams();
    const [dateFin, setDateFin] = useState('');
    const [newLibelle, setNewLibelle] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const possession = location.state || {};

    useEffect(() => {
        if (possession.dateFin) {
            setDateFin(possession.dateFin);
        }
        if (possession.libelle) {
            setNewLibelle(possession.libelle);
        }
    }, [possession]);

    const handleSubmit = async (formData) => {
        await axios.post(`/possession/${possession.libelle}`, {
            libelle: formData.newLibelle.trim() !== '' ? formData.newLibelle : libelle,
            dateDebut: possession.dateDebut,
            dateFin: formData.dateFin,
        });
        navigate('/possession');
    };

    return (
        <div>
            <h2>Mettre à jour la Possession</h2>
            <UpdatePossessionForm
                newLibelle={newLibelle}
                dateFin={dateFin}
                onNewLibelleChange={setNewLibelle}
                onDateFinChange={setDateFin}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default UpdatePossession;
