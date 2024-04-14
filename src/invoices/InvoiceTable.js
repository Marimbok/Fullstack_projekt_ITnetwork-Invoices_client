import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../utils/api";

const InvoiceTable = ({label, items, deleteInvoice}) => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/statistics").then((data) => setStatistics(data));
    }, [items.length])

    return (
        <div>
            <hr/>
            <p>
                <strong>Součet cen za celé období: {statistics.allTimeSum} Kč</strong>
                <br/>
                <strong>Součet cen za letošní rok: {statistics.currentYearSum} Kč</strong>
            </p>
            <hr/>
            <p>
                <strong>{label} {items.length}</strong>
            </p>

            <table className="table table-bordered text-center align-middle">
                <thead className="table-light ">
                    <tr className="col">
                        <th>#</th>
                        <th>Datum vystavení</th>
                        <th>Datum splatnosti</th>
                        <th>Číslo faktury</th>
                        <th>Kupující</th>
                        <th>Prodávající</th>
                        <th>Produkt/y</th>
                        <th>Cena</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.issued}</td>
                            <td>{item.dueDate}</td>
                            <td>{item.invoiceNumber}</td>
                            <td><Link to={"/persons/show/" + item.buyer._id} className="nav nav-link">{item.buyer.name}</Link></td>
                            <td><Link to={"/persons/show/" + item.seller._id} className="nav nav-link">{item.seller.name}</Link></td>
                            <td>{item.product}</td>
                            <td>{item.price} Kč</td>
                            <td>
                                <div className="btn-group">
                                    <Link to={"/invoices/show/" + item._id} className="btn btn-sm btn-info">
                                        Zobrazit
                                    </Link>
                                    <Link to={"/invoices/edit/" + item._id} className="btn btn-sm btn-warning">
                                        Upravit
                                    </Link>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteInvoice(item._id)}>
                                        Odstranit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
        </div>
    );
}
export default InvoiceTable;