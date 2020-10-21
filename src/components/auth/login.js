import React, {Component} from 'react';
import  { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';




export default class login extends Component{
    constructor(props){
        super(props);

        this.state={
            userName:"",
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
        axios.post('http://localhost:5000/management/admin-auth/session', 
        {"user_name": this.state.userName, "password": this.state.password},
        { withCredentials: true })
        .then(response =>{
            if(response.data.result==="created"){
                this.props.handleSuccessfulLogin();
            }else {
                this.setState({
                    errorText: 'Wrong password or user name'
                })
                this.props.handleUnSuccessfulLogin();
            }
        })
        .catch(error => {
            this.setState({
                errorText: 'Wrong password or user name'
            });
            
        });
    }
  

    render(){
        return(<div className="login-wrapper">
            <div className="error-txt">{this.state.errorText}</div>
            <form className="login-form-wrapper" onSubmit={this.handleSubmit}>
                <div className="username-wrapper">
                    <FontAwesomeIcon icon='users-cog'/>
                    <input type="text" 
                    name="userName"
                    placeholder="User Name" 
                    value= {this.state.userName} 
                    onChange={this.handleChange}
                    className="input-user">
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
        </div>)
    }
}