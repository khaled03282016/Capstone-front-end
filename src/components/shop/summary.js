import React from 'react';


export default function Summary(props){
    return(<div className="summary-wrapper">
    <div className="summary">
        <label>Summary</label>
        <div className="under-ligne"></div>
    </div>
    <div className="subtotal">
        Subtotal:
    </div>
    <div className="subtotal-value">
    {`${props.subtotal.toFixed(2)}$`}
    </div>
    <div className="tax">
        Estimated Tax:
    </div>
    <div className="tax-value">
    {`${(props.subtotal * 0.06).toFixed(2)}$`}
    </div>
    <div className="total">
        Total:
    </div>
    <div className="total-value">
    {`${(props.subtotal * 1.06).toFixed(2)}$`}
    </div>
</div>)
}