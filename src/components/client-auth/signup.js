import React, { Component } from 'react';
import axios from 'axios';


export default class SignUpClient extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            lastName:"",
            password:"",
            email:""
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleClick= this.handleClick.bind(this);
        this.formSignUp = this.formSignUp.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this)
    }


   
  
    handleChange(event){
       this.setState ({
           [event.target.name]:event.target.value
        })
    }


    formSignUp(){

        let formData = new FormData();

        formData.append("name", this.state.name);
        formData.append("last_name", this.state.lastName);
        formData.append("password", this.state.password);
        formData.append("email", this.state.email);

        return formData;
    }

    handleClick(event){
        this.setState({
            name:'',
            lastName:"",
            password:"",
            email:""
        })
        event.preventDefault()
    }


    handleSubmit(event){
        event.preventDefault();
        
        axios.post('http://localhost:5000/client/signup',
        this.formSignUp(), 
        { withCredentials: true })
        .then(response =>{
           if (response.status === 200){
            this.props.handleCloseModal();

            axios.post('http://localhost:5000/client/auth/session', 
            {"email": this.state.email, "password": this.state.password},
            { withCredentials: true })
            .then(response =>{
                // console.log('status', response)
                if(response.data.result.status==="created"){
                    this.props.handleSuccessfulLogin(this.state.email);
                }else {
                    this.props.handleUnSuccessfulLogin();
                }
            })
            .catch(error => {
               console.log('error sign up ', error)
                
            });
           }
        })
        .catch(error => {
            console.log('error creating member', error)
        });

        
    }

    render(){
        return(<div className="signup-wrapper">
            <form onSubmit={this.handleSubmit} >
                <input 
                className="name-wrapper"
                type='text'
                name="name"
                value={this.state.name}
                placeholder="Name"
                onChange={this.handleChange}>
                </input>
                <input 
                className="lastname-wrapper"
                type='text'
                name="lastName"
                value={this.state.lastName}
                placeholder="Last Name"
                onChange={this.handleChange}>
                </input>
                <input 
                className="email-wrapper"
                type='email'
                name="email"
                value={this.state.email}
                placeholder="Email Address"
                onChange={this.handleChange}>
                </input>
                <input 
                className="password-wrapper"
                type='password'
                name="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleChange}>
                </input>
                <button className="btn" type="submit">JOIN US</button>
                <button className="btn-clear" onClick={this.handleClick}>Clear</button>    
            </form>
        </div>)
    }
}