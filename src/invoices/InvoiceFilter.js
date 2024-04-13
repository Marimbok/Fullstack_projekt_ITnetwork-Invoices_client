import React from "react";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";

const InvoiceFilter = (props) => {
    
    const handleChange = (e) => {
        props.handleChange(e);
    };

    const handleSumbit = (e) => {
        props.handleSubmit(e);
    };

    const filter = props.filter;

    return (
        <form onSubmit={handleSumbit}>
            <div className="row">
                <div className="col">
                    <InputSelect
                        name="buyerID"
                        items={props.personsList}
                        label="Kupující"
                        prompt="Nevybrán"
                        value={filter.buyerID}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col">
                    <InputSelect
                        name="sellerID"
                        items={props.personsList}
                        label="Prodejce"
                        prompt="Nevybrán"
                        value={filter.sellerID}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col">
                    <InputField 
                        type="text"
                        name="product"
                        label="Produkt"
                        prompt="Nevybrán"
                        value={filter.product ? filter.product : ''}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <InputField 
                        type="number"
                        min="0"
                        name="minPrice"
                        handleChange={handleChange}
                        label="Cena od"
                        prompt="Neuveden"
                        value={filter.minPrice ? filter.minPrice : ''}
                    />
                </div>
                <div className="col">
                    <InputField 
                        type="number"
                        min="0"
                        name="maxPrice"
                        handleChange={handleChange}
                        label="Cena do"
                        prompt="Neuveden"
                        value={filter.maxPrice ? filter.maxPrice : ''}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu faktur"
                        prompt="Neuveden"
                        value={filter.limit ? filter.limit : ''}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <input
                        type="submit"
                        className="btn btn-secondary float-right mt-2"
                        value={props.confirm}
                    />
                </div>
            </div>
        </form>
    );
};

export default InvoiceFilter;