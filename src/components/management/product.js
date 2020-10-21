import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = props => {   
    const productItem = props.data
        return(<div  className="product-item-wrapper">
                    <div className="images-product-wraper">
                        <div className='image-wrapper'>
                            <img src={productItem.image}></img>
                        </div>
                        <div className='image-wrapper'>
                            <img src={productItem.image_1}></img>
                        </div>
                        <div className='image-wrapper'>
                            <img src={productItem.image_2}></img>
                        </div>
                        <div className='image-wrapper'>
                            <img src={productItem.image_3}></img>
                        </div>
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
}


export default Product;