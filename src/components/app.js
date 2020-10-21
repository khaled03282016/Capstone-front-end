import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt, faEdit, faAt, faUnlockAlt, faUsersCog, faShoppingCart, faLeaf
 } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import Management from './management/management';
import ProductsManagement from './management/products-management';
import OrdersManagement from './management/orders-management';
import Auth from './auth/auth';
import NotFound from './no-match';
import NavBar from './navbar/nav-bar';
import Home from './pages/home';
import ShopCart from './shop/shop-cart';
import Shipement from './shop/shipment';
import OrderReceipt from './shop/order-receipt';
import OrderDetails from './management/order-details';
import OrdersHistory from './shop/orders-history';
import OrderHistoryDetails from './shop/order-history-details';





library.add(faTrash, faSignOutAlt, faEdit, faAt, faUnlockAlt, faUsersCog,
  faShoppingCart );

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      clientLoggedInStatus: "NOT_LOGGED_IN",
      category:"",
      productSelected: false,
      listProductToBuy:[],
      productsSelected:[],
      listProductSelected: false,
      titleSelected: false, 
      isOneProductSelected: false,
      eMail:'',
      subtotal:0,
      orderConfirmedId:'',
      orderConfirmed:{},
      isOrderConfirmed: false,
      orderDetails: {}
      
    }


  this.handleSuccessfulLoggedIn= this.handleSuccessfulLoggedIn.bind(this)
  this.handleUnSuccessfulLoggedIn=this.handleUnSuccessfulLoggedIn.bind(this)
  this.getLoginStatus=this.getLoginStatus.bind(this)
  this.handleClientSuccessfulLoggedIn= this.handleClientSuccessfulLoggedIn.bind(this)
  this.handleClientUnSuccessfulLoggedIn=this.handleClientUnSuccessfulLoggedIn.bind(this)
  this.getClientLoginStatus=this.getClientLoginStatus.bind(this)
  this.handelClientLogOut=this.handelClientLogOut.bind(this)
  this.authorizedRoutes=this.authorizedRoutes.bind(this)
  this.handelLogOut= this.handelLogOut.bind(this)
  this.getMenProducts = this.getMenProducts.bind(this)
  this.getWomenProducts = this.getWomenProducts.bind(this)
  this.getKidsProducts = this.getKidsProducts.bind(this)
  this.handleAddToListCart = this.handleAddToListCart.bind(this)
  this.handleGetProduct= this.handleGetProduct.bind(this)
  this.handleChangeProductSelected= this.handleChangeProductSelected.bind(this)
  this.handleHomePage= this.handleHomePage.bind(this)
  this.handleTitleSelected= this.handleTitleSelected.bind(this)
  this.handleOneProductNotSelected = this.handleOneProductNotSelected.bind(this)
  this.handleGetGuestsProduct = this.handleGetGuestsProduct.bind(this)
  this.getMembersCart = this.getMembersCart.bind(this)
  this.handleDeleteCartProduct= this.handleDeleteCartProduct.bind(this)
  this.handleTotalCartItems=this.handleTotalCartItems.bind(this)
  this.handeleDeleteMembersCartItems = this.handeleDeleteMembersCartItems.bind(this)
  this.handeleDeleteSessionCartItems = this.handeleDeleteSessionCartItems.bind(this)
  this.handleGetOrderConfirmed=this.handleGetOrderConfirmed.bind(this)
  this.handleOrderDetails= this.handleOrderDetails.bind(this)
  this.membersRoutes = this.membersRoutes.bind(this)

    
  };

  getMenProducts(){
    this.setState({
        category: "Men"
    })
    this.handleGetProduct("Men")
  }

  getWomenProducts(){
    this.setState({
        category:'Women'
    })
    this.handleGetProduct("Women")
  }

  getKidsProducts(){
    this.setState({
        category:'Kids'
    })
    this.handleGetProduct("Kids")
  }

  handleGetProduct(category){
    axios.get(`http://localhost:5000/get/product/${category}`)
      .then(response=>{
        this.setState({
          productsSelected : response.data.result,
          productSelected: true,
          listProductSelected: true,
          titleSelected: false, 
          isOneProductSelected: false
        })
        
      })
      
      .catch(error=>{
        console.log("error getting product", error)
      });

  }


  handleOneProductNotSelected(){
    this.setState({
      isOneProductSelected: false
    })
  }

 



  handleChangeProductSelected(){
    this.setState({
      productSelected: false,
      listProductSelected: true,
      isOneProductSelected: true
    })
  }

  handleTitleSelected(){
    this.setState({
      titleSelected: true,
      isOneProductSelected: false
    })
  }

  handleHomePage(){
    this.setState({
      listProductSelected: false,
      productSelected: true,
      category: "",
      titleSelected: false,
      isOneProductSelected: false
    })
  }

  handleSuccessfulLoggedIn(){
    this.setState({
      loggedInStatus: 'LOGGED_IN'
    })
  }

  handleUnSuccessfulLoggedIn(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })}
  
 getLoginStatus(){
  axios.get('https://kcom-ecommerce-shop-api.herokuapp.com/management/get_login_status/', 
  { withCredentials: true })
    .then(response => {
      const LoggedIn = response.data.result;
      const LoggedInStatus = this.state.loggedInStatus;
      if(LoggedIn && LoggedInStatus === "LOGGED_IN") {
        return LoggedIn
      } else if (LoggedIn && LoggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: 'LOGGED_IN'
        });
      }else if (!LoggedIn && LoggedInStatus === "LOGGED_IN"){
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    })
    .catch(error => {
      console.log('error', error)
    })
 }



 handleClientSuccessfulLoggedIn(email){
  this.setState({
    clientLoggedInStatus: 'LOGGED_IN',
    eMail: email
  });
}

handleClientUnSuccessfulLoggedIn(){
  this.setState({
    clientLoggedInStatus: "NOT_LOGGED_IN"
  })}

getClientLoginStatus(){
axios.get('http://localhost:5000/client/get_login_status/', 
{ withCredentials: true })
  .then(response => {
    const LoggedIn = response.data.result.status;
    const LoggedInStatus = this.state.clientLoggedInStatus;
    if(LoggedIn && LoggedInStatus === "LOGGED_IN") {
      this.setState({
        clientLoggedInStatus: 'LOGGED_IN',
        eMail: response.data.result.email,
      });
      this.getMembersCart()
    } else if (LoggedIn && LoggedInStatus === "NOT_LOGGED_IN"){
      this.setState({
        clientLoggedInStatus: 'LOGGED_IN',
        eMail: response.data.result.email,
      });
      this.getMembersCart()
    }else if (!LoggedIn && LoggedInStatus === "LOGGED_IN"){
      this.setState({
        clientLoggedInStatus: "NOT_LOGGED_IN",
      });
    }
  })
  .catch(error => {
    console.log('error', error)
  })
}



 handleAddToListCart(product){
    this.setState({
      listProductToBuy: this.state.listProductToBuy.concat([product]),
      subtotal: this.state.subtotal + product.price
    });
 }

 
 handeleDeleteMembersCartItems(){
   axios.patch(`http://localhost:5000/shop/delete/member_cart_session/${this.state.eMail}`, {withCredentials: true})
   .then(response=>{
    this.setState({
      listProductToBuy:[],
      subtotal:0
    })
   })
   .catch(error=>{
     console.log('error deleting Cart', error)
   })
 }

 handeleDeleteSessionCartItems(){
  axios.delete('http://localhost:5000/shop/delete/cart_session', {withCredentials: true})
  .then(response=>{
    this.setState({
      listProductToBuy:[],
      subtotal:0
    })
  })
  .catch(error=>{
    console.log('error deleting Cart', error)
  })
}


 handleGetGuestsProduct(){
    axios.get('http://localhost:5000/shop/cart/get_guest_products', {withCredentials: true})
   .then(response=>{
     if (response.data.result !== 'not found'){
      this.setState({
        listProductToBuy: response.data.result.cart,
        subtotal:response.data.result.total
      })
    }
    else {
      this.setState({
        listProductToBuy:[]
      })
    }

   })
   .catch(error=>{
     console.log('error getting session product', error)
   });
 }


 handleDeleteCartProduct(product_id){
 if (this.state.clientLoggedInStatus==="NOT_LOGGED_IN"){  
   axios.delete(`http://localhost:5000/shop/cart/delete_guest_cart_shop/${product_id}`, {withCredentials: true})
   .then(response=>{
    if (response.status===200){
      this.handleGetGuestsProduct();
    }
   })
   .catch(error=>{
     console.log('error removing session', error)
   })}

   else{
    axios.patch(`http://localhost:5000//shop/cart/remove_members_cart_shop/${this.state.eMail}/${product_id}`, {withCredentials: true})
    .then(response=>{
     if (response.data.result===1){
       this.getMembersCart();
     }
    })
    .catch(error=>{
      console.log('error removing member cart product', error)
    })
   }

 }

 getMembersCart(){
    axios.get(`http://localhost:5000/shop/cart/get_members_products/${this.state.eMail}`, {withCredentials: true})
  .then(response=>{
        this.setState({
       listProductToBuy: response.data.result.cart,
       subtotal: response.data.result.subtotal
     })
    
    
  })
  .catch(error=>{
    console.log('error getting members product', error)
  });
 }

 handleTotalCartItems(){
  var total = 0 
  this.state.listProductToBuy.forEach(item=>{
      total+= parseInt(item.quantity)
  })
  return total
}


handleOrderDetails(order){
  this.setState({
    orderDetails: order
  })
}


handleGetOrderConfirmed(order){
  this.setState({
    orderConfirmed: order,
  })
}


 componentDidMount(){
  this.getLoginStatus();
  this.getClientLoginStatus();
  if(this.state.clientLoggedInStatus === "NOT_LOGGED_IN"){
    this.handleGetGuestsProduct();
  }
}






handelLogOut(){
  axios.delete('http://localhost:5000/management/admin-auth/logout/', { withCredentials: true })
  .then(response =>{
    if (!response.data.result){
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        orderDetails: {}
      });
    }
  })

  .catch(error => {
    console.log('error logging out', error)
  })
}


handelClientLogOut(){
  axios.delete('http://localhost:5000/client/auth/logout/', { withCredentials: true })
  .then(response =>{
    if (!response.data.result){
      this.setState({
        clientLoggedInStatus: "NOT_LOGGED_IN",
        // listProductToBuy: [],
        eMail:''
      });
      this.handleGetGuestsProduct()
    }
  })

  .catch(error => {
    console.log('error logging out', error)
  })
}



authorizedRoutes(){
  return[ <Route key = "management" exact path = '/management' 
  render={props=>(
    <Management
    {...props}
    handelLogOut= {this.handelLogOut}/>
  )}/>,
  <Route key = "management-products" exact path = '/management/products-managemet' 
  render={props=>(
    <ProductsManagement
    {...props}
    handelLogOut= {this.handelLogOut}/>
  )}/>,
  <Route  key = "management-orders" exact path = '/management/orders-managemet' 
  render={props=>(
    <OrdersManagement
    {...props}
    handelLogOut= {this.handelLogOut}
    handleOrderDetails={this.handleOrderDetails}/>
  )}/>,
  <Route   key = "order-details" exact path = "/order-details" 
                      render={props=>(
                        <OrderDetails
                        {...props}
                        orderDetails={this.state.orderDetails}
                        handelAdminLogOut={this.handelLogOut}
                          />
                      )}></Route>]
}

membersRoutes(){
  return[
    <Route key = 'history' exact path = "/history" 
                      render={props=>(
                        <OrdersHistory
                        {...props}
                        eMail = {this.state.eMail}
                        handleOrderDetails = {this.handleOrderDetails}
                          />
                      )}></Route>,


    <Route  key = 'order-history' exact path = "/order-history-details" 
                       render={props=>(
                       <OrderHistoryDetails
                       {...props}
                        orderDetails={this.state.orderDetails}
                          />
                      )}></Route>
  ]
}


  


  render() {
    return (<div className ="container">
      <Router>
        <div>
          <NavBar
          getMenProducts = {this.getMenProducts}
          getWomenProducts = {this.getWomenProducts}
          getKidsProducts = {this.getKidsProducts}
          handleHomePage= {this.handleHomePage}
          handleClientSuccessfulLoggedIn={this.handleClientSuccessfulLoggedIn}
          handleClientUnSuccessfulLoggedIn={this.handleClientUnSuccessfulLoggedIn}
          clientLoggedInStatus={this.state.clientLoggedInStatus}
          handelLogOut={this.handelClientLogOut}
          listProductToBuy={this.state.listProductToBuy}
          getMembersCart={this.getMembersCart}
          handleTotalCartItems={this.handleTotalCartItems}
          />
            <Switch>
              
              <Route exact path = "/" 
              render={props=>
              (<Home {...props}
              handleAddToListCart = {this.handleAddToListCart}
              category={this.state.category}
              productSelected= {this.state.productSelected}
              productsSelected={this.state.productsSelected}
              handleChangeProductSelected={this.handleChangeProductSelected}
              listProductSelected={this.state.listProductSelected}
              titleSelected = {this.state.titleSelected}
              handleTitleSelected = {this.handleTitleSelected}
              handleOneProductNotSelected={this.handleOneProductNotSelected}
              isOneProductSelected={this.state.isOneProductSelected}
              handleHomePage={this.handleHomePage}
              listProductToBuy={this.state.listProductToBuy}
              clientLoggedInStatus={this.state.clientLoggedInStatus}
              handleTotalCartItems={this.handleTotalCartItems}
              eMail={this.state.eMail}
              // handleGetGuestsProduct={this.handleGetGuestsProduct}
              />)}></Route>
              <Route  path = "/shop/cart" 
                      render={props=>(
                        <ShopCart
                        {...props}
                        listProductToBuy={this.state.listProductToBuy}
                        handleDeleteCartProduct={this.handleDeleteCartProduct}
                        getMembersCart={this.getMembersCart}
                        handleGetGuestsProduct={this.handleGetGuestsProduct}
                        subtotal={this.state.subtotal}
                        clientLoggedInStatus={this.state.clientLoggedInStatus}/>
                      )}></Route>
              <Route  path = "/shop/shipment" 
                      render={props=>(
                        <Shipement
                        {...props}
                        listProductToBuy={this.state.listProductToBuy} 
                        getMembersCart={this.getMembersCart}
                        handleGetGuestsProduct={this.handleGetGuestsProduct}
                        subtotal={this.state.subtotal}
                        clientLoggedInStatus={this.state.clientLoggedInStatus}
                        eMail={this.state.eMail}
                        handeleDeleteMembersCartItems={this.handeleDeleteMembersCartItems}
                        handeleDeleteSessionCartItems={this.handeleDeleteSessionCartItems}
                        handleGetOrderConfirmed={this.handleGetOrderConfirmed}/>
                      )}></Route>

              <Route  path = "/shop/receipt" 
                      render={props=>(
                        <OrderReceipt
                        {...props}
                        orderConfirmed={this.state.orderConfirmed}
                          />
                      )}></Route>


              
            
              <Route  path="/auth"
                      render={props => (
                      <Auth
                        {...props}
                        handleSuccessfulLoggedIn={this.handleSuccessfulLoggedIn}
                        handleUnSuccessfulLoggedIn={this.handleUnSuccessfulLoggedIn}
                        />
                    )}/>

                    {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedRoutes():null}
                    {this.state.clientLoggedInStatus === "LOGGED_IN" ? this.membersRoutes():null}




              <Route component={NotFound} />
            </Switch>
            </div>
        </Router>
        </div> );
  }
}
