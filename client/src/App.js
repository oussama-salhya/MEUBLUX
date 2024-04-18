import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
    Products,
    SingleProduct,
    Checkout,
    DashboardProducts,
    AddProductDashboard,
    Orders,
    Customers,
    ProductDetails,
    Categories,
    DashboardHome,
    Cart,
    Error,
    About,
    Home,
    UserOrders,
    Account,
    DashboardLogin,
    VerifyEmail
} from './pages'
import { ProtectedRoute, SharedDashboardLayout, Navbar, DashboardProtectedRoute, Toast } from './components'
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navbar />} >
                    <Route index element={<Home />} />
                    <Route path='products' element={<Products />} />
                    <Route path='products/:id' element={<SingleProduct />} />
                    <Route path='checkout' element={<ProtectedRoute ><Checkout /></ProtectedRoute>} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='about' element={<About />} />
                    <Route path='orders' element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
                    <Route path='account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
                    <Route path='verify-email' element={<VerifyEmail />} />
                    <Route path='*' element={<Error />} />
                </Route>
                <Route path='login' element={<DashboardLogin />} />
                <Route path='/dashboard' element={<DashboardProtectedRoute><SharedDashboardLayout /></DashboardProtectedRoute>} >
                    <Route index element={<DashboardHome />} />
                    <Route path='products' element={<DashboardProducts />} />
                    <Route path='add-product' element={<AddProductDashboard />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='customers' element={<Customers />} />
                    <Route path='products/:id' element={<ProductDetails />} />
                    <Route path='categories' element={<Categories />} />
                    <Route path='*' element={<Error />} />
                </Route>

            </Routes>
            <Toast />
        </BrowserRouter>
    )
}



export default App
