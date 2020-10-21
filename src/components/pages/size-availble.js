

import React, { Component } from "react";




export default class SizesAvailble extends Component {
    constructor(props){
        super(props);
        this.state={
              active: ''
        }
        this.getSizesAvailble=this.getSizesAvailble.bind(this)
        this.handleSelectSize = this.handleSelectSize.bind(this)
    }


    handleSelectSize(sizeA) {
        this.setState({
          active: sizeA
        });
        this.props.handleSelectSize(sizeA)
      }

getSizesAvailble(){
    
    var  Sizes = [];
    for (var size in this.props.data){
        if ( this.props.data[size] > 0 && this.props.data[size] !== ''){
            Sizes.push(size)
        }
    }

    var sizeAvailble = Sizes.map(sizeA =>{
     return(
         <input 
         type="button"
         name={sizeA}
         value={sizeA}
         key={sizeA} 
         className={this.state.active === sizeA ? "active" : "size-wrapper"} 
         onClick={()=>this.handleSelectSize(sizeA)}></input>
     )
    })
        
        
         
   
        return(<div className="sizes-availble-wrapper">{sizeAvailble}</div>)
}

      
         
   render(){
        return(this.getSizesAvailble())
   }
}
