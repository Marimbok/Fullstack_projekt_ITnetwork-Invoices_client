import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import dateStringFormatter from "../utils/dateStringFormatter";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";


const InvoiceForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: {
            _id: ""
        },
        buyer: {
            _id: ""
        },
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: ""
    })
    const [personsList, setPersonList] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        } else {
            setInvoice({...invoice, issued: dateStringFormatter(new Date())});
        }
        apiGet("/api/persons").then((data) => setPersonList(data));
    }, [id]);

    const handleSubmit = ((e) => {
        e.preventDefault();
        setSuccess(false);
        setError(null);
        setTimeout(() => {
            if(invoice.seller._id===invoice.buyer._id){
                setError("Prodejce a kupující nesmí být stejná osoba")

            } else if((invoice.seller._id=="") || (invoice.buyer._id=="")){
                setError("Prodejce i kupující musí být vyplněny");
            } else{
                (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
                .then((data) => {
                    setSent(true);
                    setSuccess(true);
                    setTimeout(() => {
                        navigate("/invoices")
                    }, 1500);
                })
                .catch((error) => {
                    console.log(error.message);
                    setError(error.message);
                    setSent(true);
                    setSuccess(false);
                });
            }

        }, 200);
        
    });

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField 
                    required={true}
                    type="number"
                    name="invoiceNumber"
                    min="3"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({...invoice, invoiceNumber: e.target.value});
                    }}
                />
                <InputSelect
                    name="seller"
                    items={personsList}
                    label="Prodejce"
                    prompt="Vyberte prodejce"
                    value={invoice.seller._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, seller: {_id: e.target.value}});
                    }}
                />
                <InputSelect
                    name="buyer"
                    items={personsList}
                    label="Kupující"
                    prompt="Vyberte kupujícího"
                    value={invoice.buyer._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, buyer: {_id: e.target.value}});
                    }}
                />
                <label>Datum vytvoření:</label>
                <p className="py-1 my-0">{invoice.issued}</p>
                <InputField 
                    required={true}
                    type="date"
                    name="dueDate"
                    min={invoice.issued}
                    label="Datum splatnosti"
                    prompt="Zadejte datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({...invoice, dueDate: e.target.value});
                    }}
                />
                <InputField 
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Produkt/y"
                    prompt="Zadejte produkt/y"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({...invoice, product: e.target.value});
                    }}
                />
                <InputField 
                    required={true}
                    type="number"
                    name="price"
                    min="1"
                    label="Cena"
                    prompt="Zadejte celkovou cenu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({...invoice, price: e.target.value});
                    }}
                />
                <InputField 
                    required={true}
                    type="number"
                    name="vat"
                    min="0"
                    label="Daň"
                    prompt="Zadejte daň"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({...invoice, vat: e.target.value});
                    }}
                />
                <InputField 
                    type="text"
                    name="note"
                    min="3"
                    label="Poznámka"
                    prompt="Oblast pro poznámky"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({...invoice, note: e.target.value});
                    }}
                />
                <input type="submit" className="btn btn-primary" value="Uložit"/>
            </form>
        </div>
    );
};
export default InvoiceForm;