import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    const total = cart.reduce( (total, element) => total+ element.price* element.quantity, 0)
    // let total = 0;
    // for(let i = 0; i < cart.length; i++){
    //     const product = cart[i];
    //     console.log(product.price, product.quantity);
    //     total = total + product.price * product.quantity || 1;
    // }


    let shipping = 0;
    if (total > 35){
        shipping = 0;
    } else if (total > 15) {
        shipping = 4.99;

    } else if (total > 0) {
        shipping = 12.99;
    }

    // const tax = Math.round(total/10);
    const tax = (total/10).toFixed(2);
    const grandTotal  = (total+shipping+ Number(tax)).toFixed(2);
    const formatNumber = num =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4 className = 'text-danger'>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product price: {formatNumber(total)}</p>
            <p><small>Shipping cost: {shipping}</small></p>
            <p><small>Tax + Vat: {tax}</small></p>
            <p>Total price: {grandTotal}</p>
            <br/>
            {props.children}
            
        </div>
    );
};

export default Cart;