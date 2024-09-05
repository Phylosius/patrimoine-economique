import { Form, Button, Container } from 'react-bootstrap';

function UpdatePossessionForm({ newLibelle, dateFin, onNewLibelleChange, onDateFinChange, onSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ newLibelle, dateFin });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Libelle</Form.Label>
                    <Form.Control
                        type="text"
                        value={newLibelle}
                        onChange={(e) => onNewLibelleChange(e.target.value)}
                    />
                    <Form.Text>Laisser vide pour ne pas modifier</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date Fin</Form.Label>
                    <Form.Control
                        type="date"
                        value={dateFin}
                        onChange={(e) => onDateFinChange(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Mettre à jour</Button>
            </Form>
        </Container>
    );
}

export default UpdatePossessionForm;
