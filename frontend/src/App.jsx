import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList/ProductList';
import ProductDetail from './Components/ProductDetail/ProductDetail';

const App = () => {
  return (
    <div>
      
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/products/:id' element={<ProductDetail/>}/>
        </Routes>
      
    </div>
  )
}

export default App