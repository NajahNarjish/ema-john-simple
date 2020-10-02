import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Products/Product';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});

    useEffect(()=>{
        fetch("http://localhost:5000/product/"+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])

    return (
        <div>
                <h1>{productKey} detail coming soon</h1>
                <Product showAddToCart = {false} product ={product}></Product>
        </div>
    );
};

export default ProductDetail;