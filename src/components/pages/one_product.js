import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';


import SizeAvailble from './size-availble';
import CartModal from '../modals/cart-modal';


import "react-responsive-carousel/lib/styles/carousel.min.css"

export default class ProductInformation extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }

        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleAddToCart(){
        this.props.handleAddToCart()
        this.setState({
            isModalOpen: true
        })
    }

    handleCloseModal(){
        this.setState({
            isModalOpen: false
        })
    }

    handleChange(event) {
        const name = event.target.name
        const value =  event.target.value 
        this.props.getQuantity(name, value)
      }


    render(){
        return(<div className="product-info-wrapper">
            <CartModal
            handleCloseModal={this.handleCloseModal}
            isModalOpen={this.state.isModalOpen}
            product={this.props.product}
            Size = {this.props.Size}
            Quantity = {this.props.Quantity}
            listProductToBuy = {this.props.listProductToBuy}
            handlePushToCart={this.props.handlePushToCart}
            handleTotalCartItems={this.props.handleTotalCartItems}
            handlePuchToCheckout={this.props.handlePuchToCheckout}
            />
            <Carousel>
                
                    <img src={this.props.data.image}></img>
                
                
                    <img src={this.props.data.image_1}></img>
                
                
                    <img src={this.props.data.image_2}></img>
                
                
                    <img src={this.props.data.image_3}></img>
                
            </Carousel>
            <div className="information">
                <div className="price">{`US$${this.props.data.Price}`}</div>
                <div className="title">{this.props.data.Title}</div>
                <div className="category">{this.props.data.Category}</div>
                <SizeAvailble
                data= {this.props.data.Size}
                handleSelectSize={this.props.handleSelectSize}/>
                <input 
                className="quantity"
                type="number"
                name="Quantity"
                placeholder="Quantity"
                onChange={this.handleChange}></input>
                <button className='btn' onClick={this.handleAddToCart}>ADD TO CART</button>
                <button className='cancel-btn' onClick={this.props.handleHomePage}>Cancel</button>
            </div>
        </div>)
    }
}