import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import SweetAlert from "sweetalert";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        const cartFromCookie = await Cookies.get('cart');
        console.log(cartFromCookie);
        if (cartFromCookie) {
            const decodedData = decodeURIComponent(cartFromCookie);
            const dataArray = decodedData.split(";");
            const cartItems = dataArray.map(item => JSON.parse(item));
            setCart(cartItems);
        }
    }

    const addToCart = (id) => {
        const isProductExist = cart.some(item => item.id === id);
        if (isProductExist) {
            SweetAlert("Thất bại!", `Sản phẩm đã tồn tại trong giỏ hàng!`, "error");
        } else {
            const newProduct = {id: id, value: 1};
            const updatedCart = [...cart, newProduct];
            Cookies.set('cart', updatedCart.map(item => JSON.stringify(item)).join(";"), { expires: 7 });
            fetchData();
            setCart(updatedCart)
            SweetAlert("Thành công!", `Bạn đã thêm sản phẩm vào giỏ hàng!`, "success");
        }
    };

    const plusToCart = (id) => {
        const updatedCart = [...cart];
        const existingProductIndex = updatedCart.findIndex(item => item.id === id);

        if (existingProductIndex !== -1) {
            updatedCart[existingProductIndex].value += 1;
        } else {
            SweetAlert("Thất bại!", `Sản phẩm không tồn tại trong giỏ hàng!`, "error");
        }
        Cookies.set('cart', updatedCart.map(item => JSON.stringify(item)).join(";"), { expires: 7 });
        setCart(updatedCart)
        fetchData();
    }

    const removeToCart = () => {
        const newCart = [];
        Cookies.remove('cart');
        fetchData();
        setCart(newCart);
    }
    const minusToCart = (id) => {
        const updatedCart = [...cart];
        const existingProductIndex = updatedCart.findIndex(item => item.id === id);
        if (existingProductIndex !== -1) {
            if (updatedCart[existingProductIndex].value === 1) {
                updatedCart.splice(existingProductIndex, 1);
                SweetAlert("Thành công!", `Đã xóa sản phẩm khỏi giỏ hàng!`, "success");
            } else {
                updatedCart[existingProductIndex].value -= 1;
            }
        } else {
            SweetAlert("Thất bại!", `Sản phẩm không tồn tại trong giỏ hàng!`, "error");
        }
        Cookies.set('cart', updatedCart.map(item => JSON.stringify(item)).join(";"), { expires: 7 });
        setCart(updatedCart);
    }



    return (
        <CartContext.Provider value={{ cart, addToCart , plusToCart, minusToCart, removeToCart}}>
            {children}
        </CartContext.Provider>
    );
};
