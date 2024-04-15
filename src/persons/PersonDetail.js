/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";
import { Link } from "react-router-dom";

const PersonDetail = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});
    const [personSales, setPersonSales] = useState([]);
    const [personPurchases, setPersonPurchases] = useState([]);

    useEffect(() => {
        apiGet("/api/persons/" + id).then((data) => setPerson(data));
    }, [id]);
    useEffect(() => {
        apiGet("/api/identification/" + person.identificationNumber + "/sales").then((data) => setPersonSales(data));
        apiGet("/api/identification/" + person.identificationNumber + "/purchases").then((data) => setPersonPurchases(data));
    }, [person.identificationNumber]);

    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <>
            <div>
                <h1>Detail osoby</h1>
                
                <hr/>
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br/>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br/>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br/>
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br/>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br/>
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {person.note}
                </p>
                <p>
                <Link to={"/persons/edit/" + id} className="btn btn-sm btn-warning">
                 Upravit
                </Link>
                </p>

                <h4 className="text-success">Vystavené faktury</h4>
                <p>Počet vystavených faktur: {personSales.length}</p>
                <table className="table table-bordered">
                    <thead className="table-success ">
                        <tr>
                            <th>#</th>
                            <th>Číslo faktury</th>
                            <th>Vystaveno</th>
                            <th>Splatnost</th>
                            <th>Prodejce</th>
                            <th>Kupující</th>
                            <th>Produkt/y</th>
                            <th>Cena</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {personSales.map((personSale, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{personSale.invoiceNumber}</td>
                                <td>{personSale.issued}</td>
                                <td>{personSale.dueDate}</td>
                                <td>{personSale.seller.name}</td>
                                <td>{personSale.buyer.name}</td>
                                <td>{personSale.product}</td>
                                <td>{personSale.price} Kč</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h4 className="text-danger">Obdržené faktury</h4>
                <p>Počet obdržených faktur: {personPurchases.length}</p>
                <table className="table table-bordered">
                    <thead className="table-danger ">
                        <tr>
                            <th>#</th>
                            <th>Číslo faktury</th>
                            <th>Vystaveno</th>
                            <th>Splatnost</th>
                            <th>Prodejce</th>
                            <th>Kupující</th>
                            <th>Produkt/y</th>
                            <th>Cena</th>
                        </tr>
                    </thead>
                    <tbody className="table-light">
                        {personPurchases.map((personPurchase, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{personPurchase.invoiceNumber}</td>
                                <td>{personPurchase.issued}</td>
                                <td>{personPurchase.dueDate}</td>
                                <td>{personPurchase.seller.name}</td>
                                <td>{personPurchase.buyer.name}</td>
                                <td>{personPurchase.product}</td>
                                <td>{personPurchase.price} Kč</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </>
    );
};

export default PersonDetail;
