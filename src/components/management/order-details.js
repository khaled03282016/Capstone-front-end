import React, {Component} from 'react';
import axios from 'axios';
import {API_URL} from '../../helpers/api';

import ProductsOrdered from "../shop/list-product-ordered";
import Summary from '../shop/summary';
import DynamikLink from './links'


export default class OrderDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            listProductOrdered:[],
        }

        this.listProductsOrdered=this.listProductsOrdered.bind(this);
        this.handleGetProducts=this.handleGetProducts.bind(this);
        this.handelAdminLogOut = this.handelAdminLogOut.bind(this)
        

    }

    listProductsOrdered(product, quantity, size){
        product["quantity"] = quantity
        product["size_ordered"] = size
        this.setState({
                listProductOrdered: this.state.listProductOrdered.concat([product])
        })

    }

    handelAdminLogOut(){
        this.props.handelAdminLogOut();
        this.props.history.push('/auth')
    }


    handleGetProducts(){
    this.props.orderDetails.list_of_orders.map(product=>{
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
        if(Object.keys(this.props.orderDetails).length>0){this.handleGetProducts()}
        
    }
    render(){
        return(
            <div className="order-details-wrapper">
                <div className="order-details-header">
                    <div className="items">{`${this.props.orderDetails.total_item} item(s)  $${this.props.orderDetails.total.toFixed(2)}`}</div>
                    <div className="order-number">
                        {`Your Order: ${this.props.orderDetails.id}`} 
                    </div>
                    <div className="order-date">
                        {`Order Date: ${this.props.orderDetails.date}`} 
                    </div>
                </div>
                <div className="shipment-information">
                    <div className="header">
                        SHIPMENT
                    </div>
                    <div className="title">Shipping Address</div>
                    <div className="guest_name">{`${this.props.orderDetails.shipment_adress.name} ${this.props.orderDetails.shipment_adress.last_name}`}</div>
                    <div className="street">{this.props.orderDetails.shipment_adress.street}</div>
                    <div className="city">
                        {`${this.props.orderDetails.shipment_adress.city}, 
                        ${this.props.orderDetails.shipment_adress.state}, 
                        ${this.props.orderDetails.shipment_adress.zipcode}`}
                    </div>
                </div>
                <div className="payment-information-wrapper">
                    <div className="header">
                        PAYEMENT
                    </div>
                    <div className="title">Payement Method</div>
                    <div className="card-number">
                        {`Card Number: ${this.props.orderDetails.card_number}`}
                    </div>
                </div>
                <ProductsOrdered
                data={this.state.listProductOrdered}/>
                <Summary
                subtotal={(this.props.orderDetails.total / 1.06)}/>
                <DynamikLink route='/management/orders-managemet' linkText= "All Orders"
                  handelLogOut= {this.handelAdminLogOut}/>
            </div>
        )
    }
}


