import React from "react";


const Category = props =>{
return(
    <div className="options-wrapper">
        <div className="option-wrapper">
            <a onClick={()=>props.handleGetTShirt()}>T-shirt</a>
        </div>
        <div className="option-wrapper">
            <a onClick={()=>props.handleGetShoes()}>Shoes</a>
        </div>
        <div className="option-wrapper">
            <a onClick={()=>props.handleGetDress()}>Dress</a>
        </div> 
        <div className="option-wrapper">   
            <a onClick={()=>props.handleGetPant()}>Pant</a>
        </div> 
        <div className="option-wrapper">  
            <a onClick={()=>props.handleGetShort()}>Short</a>
        </div> 
        <div className="option-wrapper">  
            <a onClick={()=>props.handleGetShirt()}>Shirt</a>
        </div>  
        <div className="option-wrapper"> 
            <a onClick={()=>props.handleGetSweater()}>Sweater</a>
        </div> 
        <div className="option-wrapper">  
            <a onClick={()=>props.handleGetJacket()}>Jacket</a>
        </div>    
    </div>
)
}


export default Category;