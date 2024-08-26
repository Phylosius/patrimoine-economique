import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

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
        <Container>
            <h2>Mettre à jour la Possession</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Date Fin</Form.Label>
                    <Form.Control type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
                </Form.Group>
                <Button type="submit" variant="primary">Mettre à jour</Button>
            </Form>
        </Container>
    );
}

