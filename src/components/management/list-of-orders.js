import React from "react";





const ListOfOrders = props => {   
    const listOfOrders = props.data.map(order => {
            return(<div key={order.order_id} className="order-wrapper">
                            <a className="id" onClick={()=>props.handleGetOrderDetails(order)}>
                                {order.order_id}
                            </a>
                            <div className="name">
                                {order.guest_name.toUpperCase()}
                            </div>
                            <div className="date">
                                {order.date}
                            </div>

                            <div className="address">
                                {order.shipping_address.toUpperCase()}
                            </div>

                            <div className="total">
                                {order.total.toFixed(2)} 
                            </div>
                        </div>)
                
    });
    return (<div className="list-of-orders">{listOfOrders}</div>)
}


export default ListOfOrders;