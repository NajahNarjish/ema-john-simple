import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    // fakedata na thakle api fetch korte hobe useeffect diye


    return (
        <div>
                <h1>{productKey} detail coming soon</h1>
                <Product showAddToCart = {false} product ={product}></Product>
        </div>
    );
};

export default ProductDetail;