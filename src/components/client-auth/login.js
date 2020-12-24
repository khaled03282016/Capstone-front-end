import React, {Component} from 'react';
import  { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {API_URL} from '../../helpers/api';




export default class ClientLogin extends Component{
    constructor(props){
        super(props);

        this.state={
            email:"",
            errorText:"",
            password: "",
           
        };

       this.handleChange= this.handleChange.bind(this)
       this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
          errorText: ""
        });
      }

    handleSubmit(event){
        event.preventDefault();
        axios.post(`${API_URL}/client/auth/session`, 
        {"email": this.state.email, "password": this.state.password},
        { withCredentials: true })
        .then(response =>{
            console.log("session  response", response)
            if(response.data.result.status === "created"){
                this.props.handleSuccessfulLogin(this.state.email);
                this.props.handleGetmembersCart()
            }else {
                this.setState({
                    errorText: 'Wrong password or email'
                })
                this.props.handleUnSuccessfulLogin();
            }
        })
        .catch(error => {
            this.setState({
                errorText: 'Wrong password or email'
            });
            
        });
    }
  

    render(){
        return(<div className="client-login-wrapper">

            <form className="login-form-wrapper" onSubmit={this.handleSubmit}>
                <div className="email-wrapper">
                    <FontAwesomeIcon icon='users-cog'/>
                    <input type="text" 
                    name="email"
                    placeholder="E-mail" 
                    value= {this.state.email} 
                    onChange={this.handleChange}
                    className="input-email">
                    </input>

                </div>
                <div className="password-wrapper">
                    <FontAwesomeIcon icon="unlock-alt"/>
                    <input type="password" 
                    name="password" 
                    placeholder="Password" 
                    value= {this.state.password} 
                    onChange={this.handleChange}
                    className="input-password">
                    </input>
                </div>
                <button className="btn" type="submit">
                    Login
                </button>

            </form>

            <div className="text-error">{this.state.errorText}</div>
        </div>)
    }
}