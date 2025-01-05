import React from 'react'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import Home from '../Component/Home/Home'
import Login from '../Component/Auth/Login'
import Signup from  '../Component/Auth/Signup'
import ProductPage from '../Component/Products/ProductPage'
import ProductInfo from '../Component/Products/ProductInfo'
import Contact from '../Component/Home/Contact'
import Cart from '../Component/Products/Cart'
import DataProvider from '../Component/context/DataContext'

function AppRoute() {
  return (
    <>
    <DataProvider>
        <Router>
            <Routes>
                <Route  path='/' Component={Home} />
                <Route path='/login' Component={Login} />
                <Route path='/signup' Component={Signup} />
                <Route path='/products' Component={ProductPage}></Route>
                <Route path="/products/:productName" Component={ProductInfo} />
                <Route path='/contact' Component={Contact}></Route>
                <Route path='/cart' Component={Cart}></Route>
            </Routes>
        </Router>
        </DataProvider>
    </>
  )
}

export default AppRoute