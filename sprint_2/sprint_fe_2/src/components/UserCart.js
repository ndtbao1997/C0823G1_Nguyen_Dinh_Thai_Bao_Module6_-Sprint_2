import {CartProvider} from "./CartContext";
import "./lib/animate/animate.min.css";
import "./lib/owlcarousel/assets/owl.carousel.min.css";
import "./lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css";
import "./css/bootstrap.min.css";
import "./css/style.css";
import {UserCartBody} from "./UserCartBody";

export function UserCart() {
    return <>
        <CartProvider>
            <UserCartBody />
        </CartProvider>
    </>
}