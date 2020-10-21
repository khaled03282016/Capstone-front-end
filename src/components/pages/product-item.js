import React from "react";



const ProductsList = props => {   
    const productList = props.data.map(productItem => {
        return(<div key={productItem.id} className="product-item-wrapper">
                    <div className="image-wrapper">
                        <img src={productItem.image}></img>
                        <a className="btn" onClick={()=>props.handleGetOneProduct(productItem)}>Buy Now</a>
                     
                    </div>
                    <div className="price">
                       {`US$${productItem.Price}`}
                    </div>
                   {!props.listProductSelected && !props.titleSelected ?( <div className="rotated">
                         New release
                    </div>):(null)}
                    


                </div>)
    });
    return (<div className="product-list-wrapper">{productList}</div>)
}


export default ProductsList;