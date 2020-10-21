import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const ProductsList = props => {   
    const productList = props.data.map(productItem => {
        return(<div key={productItem.id} className="product-item-wrapper">
                    <div className="image-wraper">
                        <img src={productItem.image} onClick={()=>props.handelRenderOneProduct(productItem)}></img>
                     
                    </div>
                    <div className="category">
                        {productItem.Category}
                    </div>
                    <div className="title">
                        {productItem.Title}
                    </div>

                    <div className="color">
                        {productItem.Color}
                    </div>
                    <div className="price">
                        {`${productItem.Price}$`}
                    </div>
                    <div className="actions">
                    <a
                    className="action-icon"
                    onClick={() => props.handleEditProduct(productItem)}
                    >
                    <FontAwesomeIcon icon="edit" />
                    </a>

                    <a
                    className="action-icon"
                    onClick={() => props.handleDeleteProduct(productItem)}
                    >
                    <FontAwesomeIcon icon="trash" />
                    </a>
                </div>


                </div>)
    });
    return (<div className="product-list-wrapper">{productList}</div>)
}


export default ProductsList;

