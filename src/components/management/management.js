import React, {Component} from 'react';
import { NavLink } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from '../../../static/assets/images/data.png';
import order from '../../../static/assets/images/order.png';

export default class Management extends Component  {
constructor(props){
super(props);
    this.state = {
}
this.handelAdminLogOut = this.handelAdminLogOut.bind(this)
}
handelAdminLogOut(){
    this.props.handelLogOut();
    this.props.history.push('/auth')
}
  
render(){
    return (<div className='management'>
        <h1>{this.props.adminId}</h1>
        <div className='title'>
            Data Management
        </div>
        <div className='login'>
           <div className='logout_wrapper'>
             <a onClick={this.handelAdminLogOut}>
             <span>Logout</span>
            <FontAwesomeIcon icon="sign-out-alt" /> 
            </a>
            </div>
        </div>
        <div className='prodects'>
            <div className = 'image_wrapper'>
                <img src = {data} alt='logo'/>
            </div>
            <div className = 'link_wrapper'>
                <NavLink exact to ='/management/products-managemet' activeClassName = "active_link">View Products</NavLink>
            </div>
        </div>
        <div className='orders'>
            <div className = 'image_wrapper'>
                <img src = {order} alt='logo'/>
            </div>
            <div className = 'link_wrapper'>
                <NavLink exact to ='/management/orders-managemet' activeClassName = "active_link">View Orders</NavLink>
            </div>
        </div>

    </div>)
}
}
