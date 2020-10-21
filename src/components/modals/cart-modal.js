import React, { Component } from 'react';
import ReactModal from 'react-modal';


import ShopCartModal from '../shop/shop-cart-modal'


ReactModal.setAppElement(".app-wrapper")


export default class CartModal extends Component{
    constructor(props){
        super(props);

        if (window.innerWidth > 1000){
            this.customStyles = {
            content: {
              top: "60%",
              left: "80%",
              right: "auto",
              transform: "translate(-50%, -50%)",
              width: "350px",
              height: "250px"
            },
            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.25)"
              }
          };}
          else {
            this.customStyles = {
            content: {
              top: "60%",
              left: "70%",
              right: "auto",
              transform: "translate(-50%, -50%)",
              width: "50vw",
              height: "200px"
            },
            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.25)"
              }
          };}

    }

    render(){
        return(
            <ReactModal
            style={this.customStyles}
            onRequestClose={()=>{this.props.handleCloseModal();}} 
            isOpen={this.props.isModalOpen} 
            >
            <ShopCartModal
            data={this.props.product}
            Size = {this.props.Size}
            Quantity = {this.props.Quantity}
            listProductToBuy={this.props.listProductToBuy}
            handleCloseModal={this.props.handleCloseModal}
            handlePushToCart={this.props.handlePushToCart}
            handleTotalCartItems={this.props.handleTotalCartItems}
            handlePuchToCheckout={this.props.handlePuchToCheckout}/>
            </ReactModal>
        )
    }
}