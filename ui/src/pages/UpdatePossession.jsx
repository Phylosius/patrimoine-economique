import { useState, useEffect } from 'react';
import axios from '../axiosConfig.js';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function UpdatePossession() {
    const { libelle } = useParams();
    const [dateFin, setDateFin] = useState('');
    const [newLibelle, setNewLibelle] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const possession = location.state || {};

    useEffect(() => {
        // Fetch current data for libelle
    }, [libelle]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/possession/${possession.libelle}`, {
            "libelle": newLibelle.trim() !== '' ? newLibelle : libelle,
            "dateDebut": possession.dateDebut,
            "dateFin": dateFin,
        });
        navigate('/possession');
    };

    return (
        <Container>
            <h2>Mettre à jour la Possession</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Libelle</Form.Label>
                    <Form.Control type="text" value={newLibelle} onChange={(e) => setNewLibelle(e.target.value)} />
                    <Form.Text>Laisser vide pour ne pas modifier</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date Fin</Form.Label>
                    <Form.Control type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
                </Form.Group>
                <Button type="submit" variant="primary">Mettre à jour</Button>
            </Form>
        </Container>
    );
}

export default UpdatePossession;