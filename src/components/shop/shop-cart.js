import React, { Component } from 'react';



import CartShopsList from './shop-cart-items'


export default class ShopCart extends Component {
    constructor(props){
        super(props);
        this.state={
            listProductToBuy:[],
        }

        this.handleCheckout=this.handleCheckout.bind(this)
        
    }
handleCheckout(){
    this.props.history.push("/shop/shipment")
}

componentDidMount(){
    if(this.props.clientLoggedInStatus==="LOGGED_IN"){
        this.props.getMembersCart();}
    else{
        this.props.handleGetGuestsProduct();
    }
}
    



  

    render(){
        return(<div className="cart-shop-wrapper">
            
                <CartShopsList
                data={this.props.listProductToBuy}
                handleDeleteCartProduct={this.props.handleDeleteCartProduct}/>
            

            {this.props.listProductToBuy.length>0 ?(<div className="right-column">
                <div className="summary">
                    <h1>Summary</h1>
                    <div className="under-ligne"></div>
                </div>
                <div className="subtotal">
                    Subtotal:
                </div>
                <div className="subtotal-value">
                {`${this.props.subtotal.toFixed(2)}$`}
                </div>
                <div className="tax">
                    Estimated Tax:
                </div>
                <div className="tax-value">
                {`${(this.props.subtotal * 0.06).toFixed(2)}$`}
                </div>
                <div className="total">
                    Total:
                </div>
                <div className="total-value">
                {`${(this.props.subtotal * 1.06).toFixed(2)}$`}
                </div>
                <div className="checkout">
                    <button className="btn" onClick={this.handleCheckout}>Checkout</button>
                </div>
            </div>):null}
        </div>)
    }
}