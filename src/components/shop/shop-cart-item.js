import React, {Component} from 'react';
import axios from "axios";


export default class  ShopCartItem extends Component{
    constructor(props){
        super(props);
        this.state={
            product:{}
        }

        this.getProductById = this.getProductById.bind(this);
        // this.handleDeleteCartProduct = this.handleDeleteCartProduct.bind(this)
    }

    getProductById(product_id){
        axios.get(`https://kcom-ecommerce-shop-api.herokuapp.com/get/${product_id}`, {withCredentials: true})
        .then(response => {
        this.setState({
            product: response.data.result
        })
        })
        
        .catch(error => {
          console.log("error in getproduct", error);
        });
    }





    componentDidMount(){
        this.getProductById(this.props.product_id)
    }


    render(){
        return(<div className="item-wrapper">
                        
                        <div className="image-wraper">
                                    <img src={this.state.product.image}></img>
                        </div>
                        

                        <div className="product-information">

                            <div className="id">
                                Product ID: {this.props.product_id}
                            </div>

                            <div className="quantity">
                                Quantity: {this.props.quantity}
                            </div>

                            <div className="title">
                                {`${this.state.product.Category}'s ${this.state.product.Title}`}
                            </div>

                            <div className="price">
                                {`${this.props.price.toFixed(2)}$`}
                            </div>

                            <div className="color">
                                Color: {this.state.product.Color}
                            </div>

                            <div className="size">
                                Size: {this.props.size}
                            </div>
                            
                            <div className="Remove">
                            <a
                            className="action-icon"
                            onClick={() => this.props.handleDeleteCartProduct(this.props.product_id)}
                            >
                            Remove
                            </a>
                            </div>

                        </div>
                </div>)
    }
}