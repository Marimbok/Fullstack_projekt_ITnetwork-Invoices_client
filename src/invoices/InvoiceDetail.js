import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }, [id]);

    const sellerDetail = invoice.seller;
    const buyerDetail = invoice.buyer;
    if(!sellerDetail || !buyerDetail) {return (<div>Načítám...</div>)}

    return (
        <div>
            <h1>Detail faktury</h1>
            <hr/>
            <p>
                <strong>Číslo faktury:</strong>
                <br/>
                {invoice.invoiceNumber}
            </p>
                <strong>Prodejce:</strong>
                <Link to={"/persons/show/" + sellerDetail._id} className="nav nav-link">{sellerDetail.name}</Link>
            <p>
                <strong>Kupující:</strong>
                <Link to={"/persons/show/" + buyerDetail._id} className="nav nav-link">{buyerDetail.name}</Link>
            </p>
            <p>

                <strong>Datum vytvoření:</strong>
                <br/>
                {invoice.issued}
            </p>
            <p>
                <strong>Datum splatnosti:</strong>
                <br/>
                {invoice.dueDate}
            </p>
            <p>
                <strong>Produkt/y:</strong>
                <br/>
                {invoice.product}
            </p>
            <p>
                <strong>Cena:</strong>
                <br/>
                {invoice.price}
            </p>
            <p>
                <strong>Daň</strong>
                <br/>
                {invoice.vat}
            </p>
            <p>
                <strong>Poznámky</strong>
                <br/>
                {invoice.note}
            </p>
        </div>
    );

};

export default InvoiceDetail;