import React from "react";





const ProductsOrdered = props => {   
    const OrderedProductList = props.data.map(productOrdered => {
            return(<div key={productOrdered.id} className="product-ordered-wrapper">
                        <div className="image-wraper">
                            <img src={productOrdered.image}></img>
                        
                        </div>
                        <div className="product-information">
                            <div className="id">
                                {`Product Id: ${productOrdered.id}`}
                            </div>
                            <div className="description">
                                {`${productOrdered.Category}'s ${productOrdered.Title}`}
                            </div>
                            <div className="size">
                                {`Size: ${productOrdered.size_ordered}`}
                            </div>

                            <div className="color">
                                {`Color: ${productOrdered.Color}`}
                            </div>

                            <div className="quantity">
                                {`Qty: ${productOrdered.quantity} @ $${productOrdered.Price}`}
                            </div>
                        </div>


                    </div>)
                
    });
    return (<div className="products-ordered-list-wrapper">{OrderedProductList}</div>)
}


export default ProductsOrdered;