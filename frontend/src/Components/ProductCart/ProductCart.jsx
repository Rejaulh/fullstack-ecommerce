import React from 'react'
import './ProductCart.css';
import { Link } from 'react-router-dom';

const ProductCart = ({product}) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  return (
    <Link to={`/products/${product.id}`} className='product-link'>
    <div className='product-cart'>
        <img
        src={`${BASEURL}${product.image}`}
        alt={product.name}
        className='product-image'
        />
        <h2 className='product-name'>{product.name}</h2>
        <p className='product-price'>${product.price}</p>
    </div>
    </Link>
  )
}

export default ProductCart