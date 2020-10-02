import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from "../../images/giphy.gif"
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    
    const removeProduct =(productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const handleProceedCheckout = () =>{
        history.push("/shipment")
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch("http://localhost:5000/productsByKeys", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productKeys)
        })
        .then (res => res.json())
        .then (data => setCart(data))

    }, [])

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    } 
    return (
        <div>
            <div className="shop-container">
                <div className="product-container">
                {
                cart.map(pd => <ReviewItem key = {pd.key} product ={pd} removeProduct = {removeProduct}></ReviewItem> )
                }
                {thankYou}
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <button className = "main-btn" onClick={handleProceedCheckout}>Proceed Checkout</button>
                    </Cart>
                </div>
            </div>
          
        </div>
    );
};

export default Review;