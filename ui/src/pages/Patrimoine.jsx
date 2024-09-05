import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from '../axiosConfig.js';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import PatrimoineChart from '../components/presentational/PatrimoineChart'; 
import PatrimoineValueAtDate from '../components/container/PatrimoineValueAtDate.jsx';

function Patrimoine() {
    const [dateDebut, setDateDebut] = useState(new Date("2024-01-01"));
    const [dateFin, setDateFin] = useState(new Date(new Date().setMonth(new Date().getMonth() + 5)));
    const [jour, setJour] = useState('5');
    const [chartData, setChartData] = useState({});

    const fetchPatrimoineData = async (_dateDebut, _dateFin, _jour) => {
        try {
            const response = await axios.get("/patrimoine/range", {
                params: {
                    "type": "month",
                    "dateDebut": _dateDebut,
                    "dateFin": _dateFin,
                    "jour": _jour
                }
            });

            if (response.status === 200) {
                const labels = Object.keys(response.data).map(date => new Date(date).toLocaleDateString());
                const values = Object.values(response.data);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Valeur du Patrimoine',
                            data: values,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                        },
                    ],
                });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };

    useEffect(() => {
        fetchPatrimoineData(dateDebut.toISOString().split('T')[0], dateFin.toISOString().split('T')[0], jour);
    }, []);

    const handleValidate = async () => {
        await fetchPatrimoineData(dateDebut.toISOString().split('T')[0], dateFin.toISOString().split('T')[0], jour);
    };

    return (
        <Container>
            <PatrimoineValueAtDate />
            <hr />
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Date de début</Form.Label>
                        <DatePicker selected={dateDebut} onChange={(date) => setDateDebut(date)} className="form-control" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Date de fin</Form.Label>
                        <DatePicker selected={dateFin} onChange={(date) => setDateFin(date)} className="form-control" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Jour</Form.Label>
                        <Form.Control type="number" value={jour} onChange={(e) => setJour(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <Button onClick={handleValidate} variant="primary">Valider</Button>
            <div className="mt-4">
                {chartData.labels ? <PatrimoineChart data={chartData} /> : "Chargement..."}
            </div>
        </Container>
    );
}

export default Patrimoine;
