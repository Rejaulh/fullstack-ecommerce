import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import './ProductDetail.css';
import { CartContext } from '../Context/CartContext';

const ProductDetail = () => {
    const {id} = useParams();
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Fail to fetch products")
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
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
                    src={`${products.image}`}
                    alt= {products.name}
                    className='image-detail'
                    />
                </div>
                <div className='product-name'>
                    <h1>{products.name}</h1>
                    <p>{products.price}</p>
                    <button 
                        className='cart-button' 
                        onClick={() => addToCart(products)}>
                        Add to cart 
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProductDetail