import React, {Component} from 'react';
import axios from 'axios';
import DynamikLink from './links'
import {API_URL} from '../../helpers/api';


import ProductForm  from './product-form';
import ProductsList from './product-item';
import Product from './product'







export default class ProductsManagement extends Component {
    constructor(){
        super();
        this.state = {
            Title:"",
            Category:"",
            Id:"",
            optionSelcted: false,
            idSelcted: false,
            products:[],
            product:'',
            apiUrl:"",
            edit_mode: false,
            productsSelected:[],
            productToEdit:{}
        }   
        this.handleChange = this.handleChange.bind(this)
        this.handeleSubmit= this.handeleSubmit.bind(this)
        this.handeleSubmitSelect=this.handeleSubmitSelect.bind(this)
        this.getProducts=this.getProducts.bind(this)
        this.handleDeleteProduct= this.handleDeleteProduct.bind(this)
        this.handleAddForm= this.handleAddForm.bind(this)
        this.handleEditProduct= this.handleEditProduct.bind(this)
        this.clearProductEdit= this.clearProductEdit.bind(this)
        this.handleEditSubmition=this.handleEditSubmition.bind(this)
        this.handleGetOneProduct= this.handleGetOneProduct.bind(this)
        this.handeleSubmitSelect= this.handeleSubmitSelect.bind(this)
        this.handelRenderOneProduct= this.handelRenderOneProduct.bind(this)
        this.handelAdminLogOut= this.handelAdminLogOut.bind(this)
        
    }
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }


    handleAddForm(productItem){
        if(this.state.optionSelcted){
            this.setState({
                productsSelected: [productItem].concat(this.state.productsSelected)
               }); 
        };
         this.setState({
             products: [productItem].concat(this.state.products)
            });  
    }


    handleEditSubmition(){
        if(this.state.idSelcted){
            this.handleGetOneProduct()
        }else if(this.state.optionSelcted){
            this.handelGetProductsSelected();
        }
        this.getProducts()
    }

    

    handleGetOneProduct(){
        axios.get(`${API_URL}/get/${this.state.Id}`)
          .then(response => {
            this.setState({
            product: response.data.result,
            idSelcted: true,
            optionSelcted: false,
            

          });
          })
          .catch(error => {
            console.log("error in getproduct", error);
          });
    }
    
    handeleSubmit(event){
        event.preventDefault();
        this.handleGetOneProduct();
        
    }


    handelRenderOneProduct(productItem){
        this.setState({
            Id: productItem.id,
            product: productItem,
            idSelcted: true,
            optionSelcted: false
        })

    }

    handleDeleteProduct(productItem){
        axios.delete(`${API_URL}/delete/${productItem.id}`,
        { withCredentials: true })
            .then(response =>{
            if(this.state.idSelcted === true ){
                this.setState({
                    product: '',
                    idSelcted: false   
                  });
            }
               else if (this.state.optionSelcted === false)
                {this.setState({
                    products: this.state.products.filter(item => {
                      return item.id !== productItem.id;
                    })
                  });}
                  else{
                    this.setState({
                        productsSelected: this.state.productsSelected.filter(item => {
                          return item.id !== productItem.id;
                        })
                      });
                      if (this.state.productsSelected.length==0){
                          this.setState({
                              optionSelcted:false,
                              Title: '',
                              Category: ''
                          });
                          this.getProducts();
                      } 
                  }
                return response.data

            })
            .catch(error => {
                console.log("error in delete products", error);
              }); 
        }


    handleEditProduct(productItem){
            this.setState({
                    productToEdit:productItem,
                    edit_mode: true
            });
        }

    clearProductEdit(){
            this.setState({
                productToEdit:{}
            })
        }
    
    


    handelGetProductsSelected(){
        axios.get(`https://kcom-ecommerce-shop-api.herokuapp.com/get/${this.state.Title}/${this.state.Category}`)
          .then(response => {
            this.setState({
            productsSelected: [...response.data.result],
            idSelcted: false,
            optionSelcted: true
            

          });
          })
          .catch(error => {
            console.log("error in get products", error);
          }); 
    }

    handeleSubmitSelect(event){
        event.preventDefault() 
        this.handelGetProductsSelected();
          
    }


    getProducts() {
        axios.get(`${API_URL}/get`)
          .then(response => {
            this.setState({
            products: [...response.data.result]
          });
          })
          .catch(error => {
            console.log("error in getlisteofproduct", error);
          });
      }

componentDidMount(){
        this.getProducts();
    }
    
handelAdminLogOut(){
    this.props.handelLogOut();
    this.props.history.push('/auth')
}
  
render(){
    return (<div className= "products-wrapper">
        <div className="first-rows">
                    <div className="content-wrapper">
                            <form className="selected-item" onSubmit={this.handeleSubmitSelect}>
                                <div className="selects-wrapper" >
                                    <div className="select-wrapper title">
                                        <label>Title</label>
                                        <select name="Title" value={this.state.Title} onChange={this.handleChange} className="select-option">
                                            <option value="">Select title</option>
                                            <option value="T-shirt">T-shirt</option>
                                            <option value="Shoes">Shoes</option>
                                            <option value="Dress">Dress</option>
                                            <option value="Pant">Pant</option>
                                            <option value="Short">Short</option>
                                            <option value="shirt">shirt</option>
                                            <option value="Sweater">Sweater</option>
                                            <option value="Jacket">Jacket</option>
                                        </select>            
                                    </div>
                                    <div className="select-wrapper category">
                                        <label> Category</label>
                                        <select name="Category" value= {this.state.Category} onChange={this.handleChange} className="select-option">
                                            <option value="">Category's liste</option>
                                            <option value="Men">Men</option>
                                            <option value="Women">Women</option>
                                            <option value="Kids">Kids</option>
                                        </select>

                                    </div>
                                    <button className="btn">search</button>
                                </div>
                            </form>

                            <form className="search-bar" onSubmit={this.handeleSubmit}>
                                <div className="selected-wrapper search-bar">
                                    <input type="text" 
                                        name="Id" 
                                        placeholder="Search by product ID" 
                                        value= {this.state.Id} 
                                        onChange={this.handleChange}
                                        className="input-id">
                                    </input>
                                </div>
                            </form>
                        </div>
                        
                            
                    
                                {this.state.optionSelcted?(
                                    <ProductsList 
                                    data= {this.state.productsSelected}
                                    handleDeleteProduct={this.handleDeleteProduct}
                                    handleEditProduct={this.handleEditProduct}
                                    handelRenderOneProduct={this.handelRenderOneProduct}
                                    />
                                    
                                ):( this.state.idSelcted? (
                                    <Product
                                    data={this.state.product}
                                    handleDeleteProduct={this.handleDeleteProduct}
                                    handleEditProduct={this.handleEditProduct}
                                    />
                                ):(
                                    <ProductsList
                                    data= {this.state.products}
                                    handleDeleteProduct={this.handleDeleteProduct}
                                    handleEditProduct={this.handleEditProduct}
                                    handelRenderOneProduct={this.handelRenderOneProduct}/>
                                )
                                )}
                            
            </div>
                  { !this.state.idSelcted || this.state.edit_mode ?    
                   ( <div className = "second-row">
                        <ProductForm
                        handleAddForm={this.handleAddForm}
                        clearProductEdit={this.clearProductEdit}
                        productToEdit={this.state.productToEdit}
                        handleEditSubmition={this.handleEditSubmition}/>
                    </div>):null}
                  <DynamikLink route='/management/orders-managemet' linkText= "View Orders"
                  handelLogOut= {this.handelAdminLogOut}/>
            </div> 
            
            );
   
 };


};
