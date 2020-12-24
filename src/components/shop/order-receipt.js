import React, {Component} from 'react';
import axios from 'axios';


import ProductsOrdered from "./list-product-ordered"
import Summary from './summary';
import {API_URL} from '../../helpers/api';


export default class OrderReceipt extends Component{
    constructor(props){
        super(props)
        this.state={
            listProductOrdered:[],
        }

        this.listProductsOrdered=this.listProductsOrdered.bind(this);
        this.handleGetProducts=this.handleGetProducts.bind(this);
        this.handleCardNumber= this.handleCardNumber.bind(this)
        

    }

    listProductsOrdered(product, quantity, size){
        product["quantity"] = quantity
        product["size_ordered"] = size
        this.setState({
                listProductOrdered: this.state.listProductOrdered.concat([product])
        })

    }

    handleCardNumber(cardNumber){
       const str = "**** **** " + cardNumber.slice(-4)
    return(str)
    }

    handleGetProducts(){
    this.props.orderConfirmed.list_of_orders.map(product=>{
                axios.get(`${API_URL}/get/${product.product_id}`)
                .then(response=>{
                  if(response.status===200){
                      this.listProductsOrdered(response.data.result, product.quantity, product.size)
                  }
                })
                .catch(error=>{
                    console.log("error getting products ordered", error)
                })
            })
        
    }


    

    componentDidMount(){
        if(Object.keys(this.props.orderConfirmed).length>0){this.handleGetProducts()}
        
    }
    render(){
        return(
            <div className="receipt-wrapper">
                <div className="receipt-header">
                    <h1>Thank You!</h1>
                    <div className="items">{`${this.props.orderConfirmed.total_item} item(s)  $${this.props.orderConfirmed.total.toFixed(2)}`}</div>
                </div>
                <div className="order-confirmation">
                    <h1>YOUR ORDER WAS PLACED SUCCESSFULY.</h1>
                    <span>Check your email for your order confirmation.</span>
                </div>
                <div className="order-information">
                    <div className="order-number">
                        {`Your Order: ${this.props.orderConfirmed.id}`} 
                    </div>
                    <div className="order-date">
                        {`Order Date: ${this.props.orderConfirmed.date}`} 
                    </div>
                    <div className="order-email">
                        {`We have sent the order confirmation details to ${this.props.orderConfirmed.guest_email}`}
                    </div>
                </div>
                <div className="shipment-information">
                    <div className="header">
                        SHIPMENT
                    </div>
                    <div className="title">Shipping Address</div>
                    <div className="guest_name">{`${this.props.orderConfirmed.shipment_adress.name} ${this.props.orderConfirmed.shipment_adress.last_name}`}</div>
                    <div className="street">{this.props.orderConfirmed.shipment_adress.street}</div>
                    <div className="city">
                        {`${this.props.orderConfirmed.shipment_adress.city}, 
                        ${this.props.orderConfirmed.shipment_adress.state}, 
                        ${this.props.orderConfirmed.shipment_adress.zipcode}`}
                    </div>
                </div>
                <div className="payment-information-wrapper">
                    <div className="header">
                        PAYEMENT
                    </div>
                    <div className="title">Payement Method</div>
                    <div className="card-number">
                        {`Card Number: ${this.handleCardNumber(this.props.orderConfirmed.payement_information.card_number)}`}
                    </div>
                    <div className="experation-date">
                        {`EXP: ${this.props.orderConfirmed.payement_information.experation_date}`}
                    </div>
                    <div className="buillin-adress">
                        <div className="title">Builling Details</div>
                        <div className="guest_name">{this.props.orderConfirmed.payement_information.card_holder_name}</div>
                        <div className="street">{this.props.orderConfirmed.payement_information.billing_adress.street}</div>
                        <div className="city">
                            {`${this.props.orderConfirmed.payement_information.billing_adress.city}, 
                            ${this.props.orderConfirmed.payement_information.billing_adress.state}, 
                            ${this.props.orderConfirmed.payement_information.billing_adress.zipcode}`}
                        </div>

                    </div>
                </div>
                <ProductsOrdered
                data={this.state.listProductOrdered}/>
                <Summary
                subtotal={(this.props.orderConfirmed.total / 1.06)}/>
            </div>
        )
    }
}