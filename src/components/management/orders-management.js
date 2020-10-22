import React, {Component} from 'react';
import axios from 'axios';


import DynamikLink from './links';
import ListOfOrders from './list-of-orders';

export default class OrdersManagement extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders:[]
        }
        this.handelAdminLogOut= this.handelAdminLogOut.bind(this)
        this.handleGetOrders = this.handleGetOrders.bind(this)
        this.handleGetOrderDetails = this.handleGetOrderDetails.bind(this)
        
    }


    handleGetOrders(){
        axios.get("https://kcom-ecommerce-shop-api.herokuapp.com/orders/get_orders")
        .then(response=>{
            this.setState({
                orders: [...response.data.result]
            })
        })
        .catch(error=>{
            console.log('error getting orders', error)
        })
    }

    handelAdminLogOut(){
        this.props.handelLogOut();
        this.props.history.push('/auth')
    }

    handleGetOrderDetails(orderSelected){
        axios.get(`https://kcom-ecommerce-shop-api.herokuapp.com/order/order-details/${orderSelected.order_id}`)
        .then(response=>{
            this.props.handleOrderDetails(response.data.result)
            this.props.history.push('/order-details')
            console.log('link', this.props.history)
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
            <DynamikLink route='/management/products-managemet' linkText= "View Products"
                  handelLogOut= {this.handelAdminLogOut}/>

        </div>)
}


}