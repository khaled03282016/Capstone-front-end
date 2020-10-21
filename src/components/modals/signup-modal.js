import React, { Component } from 'react';
import ReactModal from 'react-modal';


import SignUpClient from '../client-auth/signup'


ReactModal.setAppElement(".app-wrapper")


export default class SignUpModal extends Component{
    constructor(props){
        super(props);

        if (window.innerWidth > 1000){
            this.customStyles = {
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              transform: "translate(-50%, -50%)",
              width: "350px",
              height: "400px"
            },
            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.25)"
              }
          };
        }
          else {
            this.customStyles = {
            content: {
              top: "40%",
              left: "50%",
              right: "auto",
              transform: "translate(-50%, -50%)",
              width: "50vw",
              height: "250px"
            },
            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.25)"
              }
          };
        }

    }

    render(){
        return(
            <ReactModal
            style={this.customStyles}
            onRequestClose={()=>{this.props.handleCloseModal();}} 
            isOpen={this.props.isModalOpen} 
            >
            <SignUpClient
            handleCloseModal={()=>{this.props.handleCloseModal();}} 
            handleSuccessfulLogin={this.props.handleSuccessfulLogin} 
            handleUnSuccessfulLogin={this.props.handleUnSuccessfulLogin}/>
            </ReactModal>
        )
    }
}