import { useState } from 'react';
import axios from '../axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

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
        <Container>
            <h2>Créer une Possession</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Libelle</Form.Label>
                    <Form.Control type="text" value={libelle} onChange={(e) => setLibelle(e.target.value)} placeholder="Libelle" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Valeur</Form.Label>
                    <Form.Control type="number" value={valeur} onChange={(e) => setValeur(e.target.value)} placeholder="Valeur" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date Début</Form.Label>
                    <Form.Control type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Taux</Form.Label>
                    <Form.Control type="number" value={taux} onChange={(e) => setTaux(e.target.value)} placeholder="Taux" required />
                </Form.Group>
                <Button type="submit" variant="primary">Créer</Button>
            </Form>
        </Container>
    );
}

export default CreatePossession;
