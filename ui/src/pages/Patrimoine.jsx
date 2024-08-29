import {useEffect, useState} from 'react';
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
    const [chartData, setChartData] = useState({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]});

    const [patrimoineData, setPatrimoineData] = useState({});

    const fetchPatrimoineData = async (_dateDebut, _dateFin, _jour)=> {
        const {data} = await axios.get("/patrimoine/range", {
            params : {
                type: "month",
                dateDebut: _dateDebut,
                dateFin: _dateFin,
                jour: _jour
            }
        })

        console.log("data: " + Object.keys(data))
        if (data.status === 200) setPatrimoineData(data)

    }

    const buildChartData = () => {
        const labels = Object.keys(patrimoineData).map(date => new Date(date).toLocaleDateString());
        const values = Object.values(patrimoineData);
        console.log("patrimoineData:" + Object.keys(patrimoineData))
        console.log("values: " + values)
        console.log("labels: " + labels)
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

    const handleValidate = async () => {
        await fetchPatrimoineData(dateDebut, dateFin, jour);
        buildChartData();
    };


    useEffect(() => {
        fetchPatrimoineData("2020-01-01", "2020-09-01", 15)
            .then(buildChartData);

    }, []);

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
                {Object.keys(patrimoineData).length > 0 ? <Line data={chartData}/> : "chargement ..."}
                {/*<Line data={chartData}/>*/}
            </div>
        </Container>
    );
}

export default Patrimoine;
