import React, {Component} from 'react';
import axios from 'axios';


import Summary from "./summary"
import {API_URL} from '../../helpers/api';


export default class Shipement extends Component{
    constructor(props){
        super(props);
        this.state={
            shippingName: "",
            shippingLastName: "",
            eMail: "",
            shippingStreet:"",
            shippingState:"",
            shippingCity:"",
            shippingZipCode:"",
            cardNumber:"",
            cardExperationDate:"",
            cardSecurityCode:"",
            buillingStreet:"",
            buillingCity:"",
            buillingState:"",
            buillingZipCode:"",
            cardHolderName:"",
            sameInformation: ""

        }
        this.handleChange=this.handleChange.bind(this)
        this.handlePayment=this.handlePayment.bind(this)
        this.handleDeleteCartItems = this.handleDeleteCartItems.bind(this)
        this.handleGetSameShippingAdress = this.handleGetSameShippingAdress.bind(this)
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }


    handleGetSameShippingAdress(){
        this.setState({
            buillingStreet: this.state.shippingStreet,
            buillingCity: this.state.shippingCity,
            buillingState: this.state.shippingState,
            buillingZipCode: this.state.shippingZipCode,
            })
    }


    handleDeleteCartItems(){
        if (this.props.clientLoggedInStatus==="LOGGED_IN"){
            this.props.handeleDeleteMembersCartItems();
        }
        else{
            this.props.handeleDeleteSessionCartItems();
        }
        
    }

    handlePayment(){
        axios.patch(`${API_URL}/shop/shipment/shipment_informaion`,
        {   "logged_in_status": this.props.clientLoggedInStatus, 
            "email": this.props.eMail,
            "guest_email": this.state.eMail,
            "list_of_orders": this.props.listProductToBuy,
            "shipment_adress": {
                "name": this.state.shippingName,
                "last_name": this.state.shippingLastName,
                "street":this.state.shippingStreet, 
                "city":this.state.shippingCity,
                "state": this.state.shippingState,
                "zipcode": this.state.shippingZipCode
            },
            "payement_information": {
                "card_number":this.state.cardNumber,
                "experation_date":this.state.cardExperationDate,
                "security_number": this.state.cardSecurityCode, 
                "card_holder_name": this.state.cardHolderName,
                "billing_adress": {
                    "street":this.state.buillingStreet,
                    "city":this.state.buillingCity, 
                    "state": this.state.buillingState, 
                    "zipcode": this.state.buillingZipCode
                }
            },
            "total": this.props.subtotal*1.06.toFixed(2)},
            {withCredentials: true})

            .then(response=>{

                 if(response.status === 200){
                    this.props.handleGetOrderConfirmed(response.data.result)
                    this.handleDeleteCartItems();
                    this.setState({
                        shippingName: "",
                        shippingLastName: "",
                        eMail: "",
                        shippingStreet:"",
                        shippingState:"",
                        shippingCity:"",
                        shippingZipCode:"",
                        cardNumber:"",
                        cardExperationDate:"",
                        cardSecurityCode:"",
                        buillingStreet:"",
                        buillingCity:"",
                        buillingState:"",
                        buillingZipCode:"",
                        cardHolderName:"",
                        sameInformation: ""
                    })
                    this.props.history.push('/shop/receipt')
                }
             })
             .catch(error=>{
                 console.log("error payement", error)
             })
    }



    render(){
        return(<div className="shipment-wrapper">
            <div className="shipping-information-wrapper">
                <div className="title">Shipment Informaion</div>
                <input type="text" 
                name="shippingName" 
                placeholder="name" 
                value= {this.state.shippingName} 
                onChange={this.handleChange}
                className="input-shippingName">
                </input>
                <input type="text" 
                name="shippingLastName" 
                placeholder="Last Name" 
                value= {this.state.shippingLastName} 
                onChange={this.handleChange}
                className="input-shippingLastName">
                </input>
                <input type="email" 
                name="eMail" 
                placeholder="E-Mail" 
                value= {this.state.eMail} 
                onChange={this.handleChange}
                className="input-eMail">
                </input> 
                <input type="text" 
                name="shippingStreet" 
                placeholder="Adress" 
                value= {this.state.shippingStreet} 
                onChange={this.handleChange}
                className="input-shippingStreet">
                </input> 
                <input type="text" 
                name="shippingCity" 
                placeholder="City" 
                value= {this.state.shippingCity} 
                onChange={this.handleChange}
                className="input-shippingCity">
                </input>
                <input type="text" 
                name="shippingState" 
                placeholder="State" 
                value= {this.state.shippingState} 
                onChange={this.handleChange}
                className="input-shippingState">
                </input>
                <input type="number" 
                name="shippingZipCode" 
                placeholder="Zip Code" 
                value= {this.state.shippingZipCode} 
                onChange={this.handleChange}
                className="input-shippingZipCode">
                </input>   
            </div>
            <Summary
            subtotal={this.props.subtotal}/>
            <div className="payment-information">
                <div className="title">Payment Information</div>
                <div className="card-information-wrapper">
                    <input type="text" 
                    name="cardNumber" 
                    placeholder="Card Number Must be 16 Digits" 
                    value= {this.state.cardNumber} 
                    onChange={this.handleChange}
                    className="input-cardNumber">
                    </input>
                    <input type="month" 
                    name="cardExperationDate" 
                    placeholder="mm/yy" 
                    value= {this.state.cardExperationDate} 
                    onChange={this.handleChange}
                    className="input-cardExperationDate">
                    </input>
                    <input type="text" 
                    name="cardSecurityCode" 
                    placeholder="CVV" 
                    value= {this.state.cardSecurityCode} 
                    onChange={this.handleChange}
                    className="input-cardSecurityCode">
                    </input> 
                    <input type="text" 
                    name="cardHolderName" 
                    placeholder="Card Holder Name" 
                    value= {this.state.cardHolderName} 
                    onChange={this.handleChange}
                    className="input-cardHolderName">
                    </input> 
                </div>
                <div className="builling-adress-option">
                    <label className="is-same-adress"> builling Adress Same As Your Shipping Adress? </label>
                    <div>
                    <span>YES</span>
                    <input type="radio"  
                    name="sameInformation" 
                    value= "YES"
                    onChange={this.handleGetSameShippingAdress}
                    className="radio-check"
                    ></input>
                    </div>
                    <div>
                    <span>NO</span>
                    <input type="radio"  
                    name="sameInformation" 
                    value= "NO"
                    onChange={this.handleChange}
                    className="radio-check"></input>
                    </div>
                </div>
               { this.state.sameInformation === "NO"?(<div className="builling-adress-wrapper"> 
                   <input type="text" 
                    name="buillingStreet" 
                    placeholder="Adress" 
                    value= {this.state.buillingStreet} 
                    onChange={this.handleChange}
                    className="input-buillingStreet">
                   </input>
                   <input type="text" 
                    name="buillingCity" 
                    placeholder="City" 
                    value= {this.state.buillingCity} 
                    onChange={this.handleChange}
                    className="input-buillingCity">
                   </input>
                   <input type="text" 
                    name="buillingState" 
                    placeholder="State" 
                    value= {this.state.buillingState} 
                    onChange={this.handleChange}
                    className="input-buillingState">
                   </input>
                   <input type="number" 
                    name="buillingZipCode" 
                    placeholder="Zip Code" 
                    value= {this.state.buillingZipCode} 
                    onChange={this.handleChange}
                    className="input-buillingZipCode">
                   </input> 
                </div>):null }
                <div className="payment">
                    <button className="btn" onClick={this.handlePayment}>CONFIRM PAYMENT</button>
                </div>
            </div>
            
        </div>)
    }
}