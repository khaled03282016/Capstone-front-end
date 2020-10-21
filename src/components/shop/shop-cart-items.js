import React from "react";



import ShopCartItem from './shop-cart-item'



const CartShopsList = props => {   
    const productList = props.data.map(cartShopItem => {
        
        return(<div key={cartShopItem.product_id} className="cart-shop-item-wrapper">
                
                    <ShopCartItem
                    product_id={cartShopItem.product_id}
                    quantity={cartShopItem.quantity}
                    price={cartShopItem.price}
                    size={cartShopItem.size}
                    handleDeleteCartProduct={props.handleDeleteCartProduct}
                   />
                </div>)
    });
    
    return (<div className="cart-shop-list-wrapper">{productList}</div>)
}


export default CartShopsList;

