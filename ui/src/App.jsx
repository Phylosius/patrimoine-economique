import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Patrimoine from './pages/Patrimoine';
import ListPossession from './pages/ListPossession';
import CreatePossession from './pages/CreatePossession';
import UpdatePossession from './pages/UpdatePossession';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/patrimoine" element={<Patrimoine />} />
          <Route path="/possession" element={<ListPossession />} />
          <Route path="/possession/create" element={<CreatePossession />} />
          <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
        </Routes>
      </Router>
  );
}

export default App;

