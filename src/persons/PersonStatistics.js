import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";

const PersonStatistics = () => {
    const [personsStatistics, setPersonsStatistics] = useState([]);

    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => setPersonsStatistics(data))
    }, [])
    return (
        <div>
            <h1>Statistiky dle osob</h1>
            <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>Jméno osoby</th>
                        <th>Celkový zisk</th>
                    </tr>
                </thead>
                <tbody>
                    {personsStatistics.map((personStatistic, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <Link to={"/persons/show/" + personStatistic.personId} className="nav nav-link">{personStatistic.personName}</Link>
                            <td>{personStatistic.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default PersonStatistics;