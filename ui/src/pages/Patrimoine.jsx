import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function Patrimoine() {
    const [dateDebut, setDateDebut] = useState(new Date());
    const [dateFin, setDateFin] = useState(new Date());
    const [jour, setJour] = useState('1');
    const [chartData, setChartData] = useState({});

    const handleValidate = async () => {
        const response = await axios.post('/patrimoine/range', { type: 'month', dateDebut, dateFin, jour });
        // Process response and update chartData
    };

    return (
        <div>
            <DatePicker selected={dateDebut} onChange={(date) => setDateDebut(date)} />
            <DatePicker selected={dateFin} onChange={(date) => setDateFin(date)} />
            <input type="number" value={jour} onChange={(e) => setJour(e.target.value)} />
            <button onClick={handleValidate}>Valider</button>
            <Line data={chartData} />
        </div>
    );
}

export default Patrimoine;
