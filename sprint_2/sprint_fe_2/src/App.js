import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./components/Home";
import {ListProduct} from "./components/ListProduct";
import {ProductDetails} from "./components/ProductDetails";
import {ToastContainer} from "react-toastify";
import {UserCart} from "./components/UserCart";
import {CartProvider} from "./components/CartContext";
import {Login} from "./components/Login";

function App() {
    return (<>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/list-product/:id" element={<ListProduct/>}></Route>
                        <Route path="/product-detail/:id" element={<ProductDetails />}></Route>
                        <Route path="/user-cart" element={<UserCart />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </BrowserRouter>
                <ToastContainer />
            </CartProvider>
    </>

    );
}

export default App;
