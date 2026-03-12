import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList/ProductList';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Navbar from './Components/Navbar/Navbar';
import CartPage from './Components/Pages/CartPage';

const App = () => {
  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/products/:id' element={<ProductDetail/>}/>
          <Route path='/cart' element={<CartPage/>}/>
        </Routes>
      
    </div>
  )
}

export default App