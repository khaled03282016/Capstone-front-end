import React, { Component } from 'react';



export default class ShopCartModal extends Component{
    constructor(props){
        super(props);


        this.handleViewCart=this.handleViewCart.bind(this)
        this.handleCheckout=this.handleCheckout.bind(this)
    }
    handleViewCart(){
        this.props.handleCloseModal();
        this.props.handlePushToCart();
    }

    handleCheckout(){
        this.props.handleCloseModal();
        this.props.handlePuchToCheckout();
    }

    render(){
        return(
            <div className="shop-cart-modal-content-wrapper">
                <div className="image-wrapper">
                    <img src = {this.props.data.image}></img>
                </div>
                <div className="title">
                    {`${this.props.data.Title}'s Id ${this.props.data.id}`}
                </div>
                <div className="description">
                {`${this.props.data.Category}'s ${this.props.data.Title}`}
                </div>
                <div className="size">
                    {this.props.Size}
                </div>
                <div className="quantity">
                    {this.props.Quantity}
                </div>
                <div className="price">
                {`$ ${(this.props.data.Price * this.props.Quantity).toFixed(2)}`}
                </div>
                <div className="check-out">
                    <button className='btn' onClick={this.handleCheckout}>Checkout</button>            
                </div>
                <div className="view-cart">
                    <button className='btn' onClick={this.handleViewCart}>View Cart {this.props.listProductToBuy.length !== 0 ?
                    `(${this.props.handleTotalCartItems()})`: null}</button>
                </div>

            </div>
        )
    }
}