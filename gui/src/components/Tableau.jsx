import React from 'react';
import { Table } from 'react-bootstrap';

/**
 * @param {{
 *     tHeader: String[],
 *     tBody: {}[]
 * }} props
 * */
function Tableau(props) {
    return (
        <div className="container">
            <h1>{props.tabTitle ? props.tabTitle : "Patrimoine"} </h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    {props.tHeader.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {
                    props.tBody.map((ps, index) => {
                        const valeurAfter = Math.round(ps.getValeur(new Date()))
                        return (
                            <tr key={index}>
                                <td>{ps.libelle}</td>
                                <td>{ps.valeur}</td>
                                <td>{ps.dateDebut.toLocaleDateString()}</td>
                                <td>{ps.dateFin.toLocaleDateString()}</td>
                                <td>{ps.tauxAmortissement}%</td>
                                <td>{valeurAfter}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
    );
}

export default Tableau;
