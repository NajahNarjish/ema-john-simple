import React from 'react';

const Inventory = () => {
    const handleAddProducts =() =>{
        const product = {};
        fetch("http://localhost:5000/addProduct", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(product)
        })

    }
    return (
        <div>
            <form action ="">
                <p><span>Name:</span><input type="text"/></p>
                <p><span>Price:</span><input type="text"/></p>
                <p><span>Quantity:</span><input type="text"/></p>
                <p><span>Product Image</span><input type="file"/></p>
            </form>
            <button onClick ={handleAddProducts}>Add Product</button>
        </div>
    );
};

export default Inventory;