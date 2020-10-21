import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from '../../../static/assets/images/logo1.png';


import SignUpModal from '../modals/signup-modal';
import LoginModal from '../modals/login-modal'



export default class NavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            isSignUpModalOpen: false,
            isLoginModalOpen: false,
        }

        this.handleOpenSigneUpModale=this.handleOpenSigneUpModale.bind(this)
        this.handleCloseSigneUpModale = this.handleCloseSigneUpModale.bind(this)
        this.handleOpenLoginModale=this.handleOpenLoginModale.bind(this)
        this.handleCloseLoginModale = this.handleCloseLoginModale.bind(this)
        this.handleSuccessfulLogin= this.handleSuccessfulLogin.bind(this)
        this.handleGetmembersCart= this.handleGetmembersCart.bind(this)
        
    };


    handleOpenSigneUpModale(){
        this.setState({
            isSignUpModalOpen: true 
        })
    }

    handleCloseSigneUpModale(){
        this.setState({
            isSignUpModalOpen: false 
        })
    }

    handleOpenLoginModale(){
        this.setState({
            isLoginModalOpen: true 
        })
    }

    handleCloseLoginModale(){
        this.setState({
            isLoginModalOpen: false 
        })
    }

    handleSuccessfulLogin(email){
        this.props.handleClientSuccessfulLoggedIn(email);
        this.handleCloseLoginModale();
    }

    handleGetmembersCart(){
        this.props.getMembersCart();
    }


 

    componentDidMount(){
        this.props.handleTotalCartItems()
    }

   

    render(){
        return(<div className="navbar-wrapper">
            <SignUpModal
            isModalOpen={this.state.isSignUpModalOpen}
            handleCloseModal={this.handleCloseSigneUpModale}
            handleSuccessfulLogin={this.handleSuccessfulLogin}
            handleUnSuccessfulLogin={this.props.handleClientUnSuccessfulLoggedIn}/>

            <LoginModal
            isModalOpen={this.state.isLoginModalOpen}
            handleCloseModal={this.handleCloseLoginModale}
            handleSuccessfulLogin={this.handleSuccessfulLogin}
            handleUnSuccessfulLogin={this.props.handleClientUnSuccessfulLoggedIn}
            handleGetmembersCart={this.handleGetmembersCart}
            />  
            
            <div className = 'left-side'>
                <div className="logo-img">
                <NavLink to = "/" activeClassName="active-navlink">
                    <img src={logo} onClick={this.props.handleHomePage}></img>
                </NavLink>
                </div>
                <div className= "navlinks-wrapper">
                    <div className="navlink-wrapper">
                    <a onClick={this.props.getMenProducts}>Men</a>
                    </div>
                    <div className="navlink-wrapper">
                    <a onClick={this.props.getWomenProducts}>Women</a>
                    </div>
                    <div className="navlink-wrapper">
                    <a onClick={this.props.getKidsProducts}>Kids</a>
                    </div>
                </div>
            </div>
            <div className="right-side">
                {this.props.clientLoggedInStatus === "NOT_LOGGED_IN" ? (
                    <div className="login-logout">
                        <div className="navlink-wrapper">
                            <a onClick = {this.handleOpenLoginModale} >Login</a>
                        </div>
                        <div className="navlink-wrapper">
                            <a onClick = {this.handleOpenSigneUpModale} >Sign Up</a>
                        </div>
                    </div>):(
                    <div className="login-logout">
                                <div className="navlink-wrapper">
                                     <NavLink to = "/history" activeClassName="active-navlink">
                                      History
                                     </NavLink>
                                </div>
                                <div className="navlink-wrapper">
                                    <NavLink to = '/'>
                                    <div onClick = {this.props.handelLogOut} >Sign Out</div>
                                    </NavLink>
                                </div>
                    </div>)}
                <div className="cart-wrapper">
                <NavLink to = "/shop/cart" activeClassName="active-navlink">
                    <FontAwesomeIcon icon = "shopping-cart"/>
                    {this.props.listProductToBuy.length !== 0 ?
                    `(${this.props.handleTotalCartItems()})`: null}
                </NavLink>
            </div>
            </div>
        </div>)
    }
}