import { useState } from 'react';
import axios from '../../axiosConfig.js';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PatrimoineValueAtDate({ onValueFetched }) {
    const [selectedDate, setSelectedDate] = useState((new Date()).toISOString());
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/patrimoine/${selectedDate}`);
            setValue(response.data.value); // Accéder à la valeur dans l'objet
            if (onValueFetched) onValueFetched(response.data.value); // Passer la valeur au composant parent si nécessaire
        } catch (error) {
            setError('Erreur lors de la récupération de la valeur.');
        }
    };

    return (
        <Row >
            <Col>
                <h5>Valeur du Patrimoine à une Date Donnée</h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <div>
                            <DatePicker 
                                selected={selectedDate} 
                                onChange={(date) => setSelectedDate(date)} 
                                className="form-control" 
                            />
                        </div>
                    </Form.Group>
                    <Button type="submit" variant="primary">Obtenir la Valeur</Button>
                </Form>
                {value !== null && <div className="mt-3">Valeur : {value}</div>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Col>
        </Row>
    );
}

export default PatrimoineValueAtDate;
