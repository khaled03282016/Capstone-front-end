import React, { Component } from 'react';
import axios from 'axios';

import Category from './category';
import ProductsList from './product-item';
import ProductInformation from './one_product';


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            lastRelease:[],
            product:{},
            productSelected: false,
            Size:'',
            Quantity:'',
            listProductToBuy:[],
            renderCart: false,
            listProductByTitle:[],
            

 }
        this.handleGetTShirt=this.handleGetTShirt.bind(this)
        this.handleGetShoes=this.handleGetShoes.bind(this)
        this.handleGetDress=this.handleGetDress.bind(this)
        this.handleGetShort=this.handleGetShort.bind(this)
        this.handleGetPant=this.handleGetPant.bind(this)
        this.handleGetShirt=this.handleGetShirt.bind(this)
        this.handleGetJacket=this.handleGetJacket.bind(this)
        this.handleGetSweater=this.handleGetSweater.bind(this)
        this.getLastReleasProduct= this.getLastReleasProduct.bind(this)
        this.handleGetOneProduct = this.handleGetOneProduct.bind(this)
        this.handleSelectSize= this.handleSelectSize.bind(this)
        this.handleAddToCart=this.handleAddToCart.bind(this)
        this.handleGetProductsSelected = this.handleGetProductsSelected.bind(this)
        this.getQuantity = this.getQuantity.bind(this)
        this.handlePushToCart = this.handlePushToCart.bind(this)
        this.handlePuchToCheckout= this.handlePuchToCheckout.bind(this)
       

    }
    handleGetTShirt(){
        this.setState({
            title:"T-shirt",
        })
        this.props.handleTitleSelected();
        this.handleGetProductsSelected("T-shirt", this.props.category || "Men")
    }

    handleGetDress(){
        this.setState({
            title:'Dress'
        })
        this.props.handleTitleSelected();
        this.handleGetProductsSelected("Dress", this.props.category || "Men")
    }
    handleGetShirt(){
        this.setState({
            title:'Shirt'
        })
        this.props.handleTitleSelected();
        this.handleGetProductsSelected("Shirt", this.props.category || "Men")
    }
    handleGetShoes(){
        this.setState({
            title:'Shoes'
        })
        this.props.handleTitleSelected();
        this.handleGetProductsSelected("Shoes", this.props.category || "Men")
    }
   
    handleGetShort(){
        this.setState({
            title:'Short'
        })
        this.props.handleTitleSelected();
        this.handleGetProductsSelected("Short", this.props.category || "Men")
    }
    handleGetPant(){
        this.setState({
            title:'Pant'
        })
        this.props.handleTitleSelected();
        this.handleGetProductsSelected("Pant", this.props.category || "Men")
    }

    handleGetJacket(){
        this.setState({
            title:'Jacket'
        })
        this.props.handleTitleSelected();
        this.handleGetProductsSelected("Jacket", this.props.category || "Men")
    }
    handleGetSweater(){
        this.setState({
            title:'Sweater'
        })
        this.props.handleTitleSelected();
        this.handleGetProductsSelected("Sweater", this.props.category || "Men")
    }


    getLastReleasProduct(){
        axios.get('http://localhost:5000/product/last-release')
        .then(response => {
            this.setState({
                lastRelease: response.data.result
            })
            this.props.handleOneProductNotSelected()
        })
        .catch(error => {
            console.log('error', error)
        })
    }

    handleGetOneProduct(productItem){
        this.setState({
            product: productItem,
            productSelected: true
        })
        this.props.handleChangeProductSelected()
    }

    handleSelectSize(sizeA){
        this.setState({
            Size: sizeA,
        })
    }

    getQuantity(Quantity, value){
        this.setState({
            [Quantity]: value
        })
    }

    handleAddToCart(){
        
           var  productAddedToCart={
                product_id:this.state.product.id,
                size: this.state.Size,
                quantity: this.state.Quantity,
                price: this.state.Quantity * this.state.product.Price,
            }
        
        this.props.handleAddToListCart(productAddedToCart);

        if (this.props.clientLoggedInStatus === "NOT_LOGGED_IN"){
        axios.post('http://localhost:5000/shop/cart', 
            {"id": productAddedToCart.product_id, "size": productAddedToCart.size, 
            "quantity": productAddedToCart.quantity, "price": productAddedToCart.price},
            { withCredentials: true })

            .then(response=>{
                if (response.status===200){
                    return 'ok'
                }
                else{
                    console.log('error creating session', error) 
                }
                
            })
            .catch(error=>{
                console.log('error creating session', error)
            });}
            else{
                axios.patch('http://localhost:5000/shop/cart/members_cart_shop', 
                {"id": productAddedToCart.product_id, "size": productAddedToCart.size, 
                "quantity": productAddedToCart.quantity, "price": productAddedToCart.price, 
                'email': this.props.eMail},
                { withCredentials: true })
    
                .then(response=>{
                    if (response.status===200){
                        return 'ok'
                    }
                    else{
                        console.log('error creating session', error) 
                    }
                    
                })
                .catch(error=>{
                    console.log('error creating session', error)
                }); 
            }



        this.setState({
            renderCart: true,
            listProductToBuy: this.state.listProductToBuy.concat([productAddedToCart]),
        })
    }


    handleGetProductsSelected(title, category ){
        axios.get(`http://localhost:5000/get/${title}/${category}`)
          .then(response=>{
            this.setState({
                listProductByTitle : response.data.result,
            });
            
          })
          
          .catch(error=>{
            console.log("error getting product", error)
          });
    
      }

    
    handlePushToCart(){ 
        this.props.history.push('/shop/cart')
      }

    handlePuchToCheckout(){
        this.props.history.push('/shop/shipment')
    }
    componentDidMount(){
        this.getLastReleasProduct()
    }

    render(){
        return(<div className="home-page-wrapper">
            <Category
             handleGetTShirt={this.handleGetTShirt}
             handleGetShoes={this.handleGetShoes}
             handleGetDress={this.handleGetDress}
             handleGetShort={this.handleGetShort}
             handleGetPant={this.handleGetPant}
             handleGetShirt={this.handleGetShirt}
             handleGetJacket={this.handleGetJacket}
             handleGetSweater={this.handleGetSweater}/>
             {this.props.isOneProductSelected ?(
             <ProductInformation
             data={this.state.product}
             handleSelectSize={this.handleSelectSize}
             handleAddToCart={this.handleAddToCart}
             handleHomePage={this.props.handleHomePage}
             getQuantity= {this.getQuantity}
             product={this.state.product}
             Size = {this.state.Size}
             Quantity = {this.state.Quantity}
             listProductToBuy= {this.props.listProductToBuy}
             handlePushToCart={this.handlePushToCart}
             handlePuchToCheckout={this.handlePuchToCheckout}
             handleTotalCartItems={this.props.handleTotalCartItems}
             
             />):
             !this.props.listProductSelected && !this.props.titleSelected && !this.props.isOneProductSelected?(
             <ProductsList
             data= {this.state.lastRelease}
             handleGetOneProduct={this.handleGetOneProduct}
             listProductSelected={this.props.listProductSelected}
             titleSelected={this.props.titleSelected}/>):(null)} 
             {(this.props.listProductSelected && !this.props.titleSelected && !this.props.isOneProductSelected)?
             (<ProductsList
             data={this.props.productsSelected}
             handleGetOneProduct={this.handleGetOneProduct}
             listProductSelected={this.props.listProductSelected}
             titleSelected={this.props.titleSelected}/>):(null)}
             {((this.props.listProductSelected || this.props.category === "") && this.props.titleSelected && !this.props.isOneProductSelected)?
             (<ProductsList
             data={this.state.listProductByTitle}
             handleGetOneProduct={this.handleGetOneProduct}
             listProductSelected={this.props.listProductSelected}
             titleSelected={this.props.titleSelected}/>):(null)}
        </div>)
    }
}