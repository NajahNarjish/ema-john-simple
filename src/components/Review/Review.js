import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
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
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key  === key);
            product.quantity = savedCart[key];
            // object.values diye o quantity er man ber kora jay
            return product;
        });
        setCart(cartProducts);
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