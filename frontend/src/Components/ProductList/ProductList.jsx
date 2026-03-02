import React from 'react'
import './ProductList.css';
import { useEffect, useState } from 'react';
import ProductCart from '../ProductCart/ProductCart';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(()=>{
        fetch(`${BASEURL}/api/products`)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Fail to fetch products")
            }
            return response.json();
        })
        .then((data)=>{
            setProducts(data);
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
            setLoading(false);
        });
    }, []);

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Error: {error}</div>
    }

  return (
    <div className="product">
      <h1 className="product-head">Product List</h1>
      <div className="product-list">
        {products.length>0?(
            products.map((product)=>(
                <ProductCart key={product.id} product={product}/>
            ))
        ):(
            <p>No products available</p>
        )}
      </div>
    </div>
  )}

export default ProductList