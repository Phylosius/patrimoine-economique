import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import axios from '../axiosConfig.js';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function Patrimoine() {
    const [dateDebut, setDateDebut] = useState(new Date());
    const [dateFin, setDateFin] = useState(new Date());
    const [jour, setJour] = useState('1');
    const [chartData, setChartData] = useState({});

    const handleValidate = async () => {
        const response = await axios.post('/patrimoine/range', { type: 'month', dateDebut, dateFin, jour });
        const cacheChartData = chartData;

        response.data.forEach((item) => {
            cacheChartData[item] = response.data[item];
        })

        setChartData(cacheChartData)
    };

    return (
        <Container>
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
                {/*<Line data={[chartData]} />*/}
            </div>
        </Container>
    );
}

export default Patrimoine;
