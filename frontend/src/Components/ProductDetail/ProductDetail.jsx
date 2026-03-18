import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import './ProductDetail.css';
import { CartContext } from '../Context/CartContext';

const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    console.log(product);

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Fail to fetch products")
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id, BASEURL]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }


    return (
        <div className='product-detail'>
            <div className='product-image'>
                <div className='product-detail-image'>
                    <img 
                    src={`${product.image}`}
                    alt= {product.name}
                    className='image-detail'
                    />
                </div>
                <div className='product-name'>
                    <h1>{product.name}</h1>
                    <p>{product.price}</p>
                    <button 
                        className='cart-button' 
                        onClick={() => addToCart(product)}>
                        Add to cart 
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProductDetail