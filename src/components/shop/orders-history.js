import React, {Component} from 'react';
import axios from 'axios';


import ListOfOrders from '../management/list-of-orders'


export default class OrdersHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            orders:[]
        }
        this.handleGetOrders = this.handleGetOrders.bind(this)
        this.handleGetOrderDetails = this.handleGetOrderDetails.bind(this)
    }


    handleGetOrders(){
        axios.get(`https://kcom-ecommerce-shop-api.herokuapp.com/orders/members/history/${this.props.eMail}`)
        .then(response=>{
            this.setState({
                orders: [...response.data.result]
            })
        })
        .catch(error=>{
            console.log('error getting orders', error)
        })
    }



    handleGetOrderDetails(orderSelected){
        axios.get(`https://kcom-ecommerce-shop-api.herokuapp.com/order/order-details/${orderSelected.order_id}`)
        .then(response=>{
            this.props.handleOrderDetails(response.data.result)
            this.props.history.push('/order-history-details')
        })
        .catch(error=>{
            console.log("error getting order details", error)
        })

    }

    componentDidMount(){
        this.handleGetOrders();
    }
render(){
    return (<div className="orders-container">
            <div className="orders-wrapper">
                <div className="titels-wrapper">
                    <div>ORDER ID </div>
                    <div>CUSTOMER NAME</div>
                    <div>ORDER DATE</div>
                    <div>SHIPPING ADDRESS</div>
                    <div>TOTAL</div>
                </div>
                <ListOfOrders
                data={this.state.orders}
                handleGetOrderDetails={this.handleGetOrderDetails}/>
            </div>

        </div>)
}


}