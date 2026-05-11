import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList/ProductList';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Navbar from './Components/Navbar/Navbar';
import CartPage from './Components/Pages/CartPage';
import OrderPage from './Components/Pages/OrderPage';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';  

const App = () => {
  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/products/:id' element={<ProductDetail/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route element={<PrivateRoute/>}>   
          <Route path='/checkout' element={<OrderPage/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/> 
        </Routes>
      
    </div>
  )
}

export default App