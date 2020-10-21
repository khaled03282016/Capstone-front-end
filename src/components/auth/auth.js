import React, {Component} from 'react';


import adminAuth from '../../../static/assets/images/admin-auth.png';
import Login from './login'



export default class Auth extends Component{
    constructor(props){
        super(props);

        this.state={

        };
       
        this.handleSuccessfulLogin= this.handleSuccessfulLogin.bind(this)
        this.handleUnsuccessfulLogin= this.handleUnsuccessfulLogin.bind(this)
        
    }

    handleSuccessfulLogin(){
        this.props.handleSuccessfulLoggedIn();
        this.props.history.push('/management')
    }

    handleUnsuccessfulLogin() {
        this.props.handleUnsuccessfulLoggedIn();
      }

  

    render(){
        return(<div className="auth-wrapper">
            <div className="left" 
            style={{
            backgroundImage: `url(${adminAuth})`
            }}/>
            <Login
                handleSuccessfulLogin={this.handleSuccessfulLogin}
                handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
               />
        </div>)
    }
}