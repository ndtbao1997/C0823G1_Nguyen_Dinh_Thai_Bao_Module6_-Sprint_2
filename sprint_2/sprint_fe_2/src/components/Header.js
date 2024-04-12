import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBone, faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {ProductService} from "../service/ProductService";
import {Link, useNavigate} from "react-router-dom";
import {useCart} from "./CartContext";
import "./lib/animate/animate.min.css";
import "./lib/owlcarousel/assets/owl.carousel.min.css";
import "./lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css";
import "./css/bootstrap.min.css";
import "./css/style.css";
import Cookies from "js-cookie";
import {UserService} from "../service/UserService";

export function Header() {
    const [listProductType, setListProductType] = useState([]);
    const navigate = useNavigate();
    const { cart } = useCart();
    const [profile,setProfile] = useState("");
    const [fullName, setFullName] = useState("");
    const [isEmployee,setIsEmployee] = useState(false);
    const [isCustomer,setIsCustomer] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    const [isLogin,setIsLogin] = useState(false);
    useEffect(() => {
        const tomoApp = Cookies.get("tomoApp");
        if (tomoApp !== undefined){
            setIsLogin(true);
            const profile = Cookies.get("profile");
            const fullName = Cookies.get("fullName");
            setProfile(profile);
            setFullName(fullName);
        }
        const role = Cookies.get("roles");
        if (role !== undefined) {
            const arrRole = role.split(",").map(item => item.trim());
            for(let i = 0; i < arrRole.length; i++) {
                const roleItem = arrRole[i];
                if (roleItem === "ROLE_CUSTOMER") {
                    setIsCustomer(true);
                }
                if (roleItem === "ROLE_EMPLOYEE") {
                    setIsEmployee(true);
                }
                if (roleItem === "ROLE_ADMIN") {
                    setIsAdmin(true);
                }
            }
        }
        console.log(isEmployee)
        console.log(isAdmin)
        console.log(isCustomer)
    }, [])
    const fetchData = async () => {
       try {
           const res = await ProductService.findAllProductType();
           setListProductType(res.data);
           console.log(res)
       } catch (err){
           console.log(err);
       }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const handleNavigate = (id) => {
        navigate(`/list-product/${id}`)
    }
    const handleUserCart = () => {
        navigate(`/user-cart`)
    }
    const handleLogout = async () => {
        Cookies.remove("roles");
        Cookies.remove("fullName");
        Cookies.remove("profile");
        Cookies.remove("tomoApp");
        Cookies.remove("jwtToken");
        Cookies.remove("userEmail");
        Cookies.remove("userId");
        setIsLogin(false);
        setProfile("")
        setFullName("");
        setIsCustomer(false);
        setIsAdmin(false);
        setIsEmployee(false);
        sessionStorage.setItem("isLogout","isLogout");
        try {
            const res = UserService.handleLogout();
        } catch (err) {
            console.log(err);
        }
        navigate("/");
    }
    return <>
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
                <a href="" className="navbar-brand p-0">
                    <h1 className="text-primary m-0">
                        <FontAwesomeIcon icon={faBone}/> Tomo Shop
                    </h1>
                    {/* <img src="img/logo.png" alt="Logo"> */}
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                >
                    <span className="fa fa-bars"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0 pe-4">
                        <Link to="/" className="nav-item nav-link active">
                            Trang chủ
                        </Link>
                        <a href="about.html" className="nav-item nav-link">
                            Diễn đàn
                        </a>
                        <a href="service.html" className="nav-item nav-link">
                            Liên hệ
                        </a>
                        <a href="menu.html" className="nav-item nav-link">
                            Tin tức
                        </a>
                        {isAdmin || isEmployee ?  <Link to={"/manager"} className="nav-item nav-link">
                            Quản lý
                        </Link> : ""}
                        <div className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                Hạt
                            </a>
                            <div className="dropdown-menu m-0">
                                {listProductType.map((pt) => (
                                    <a href="#" onClick={() => handleNavigate(pt.id)} className="dropdown-item" key={pt.id}>
                                        {pt.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    {isLogin ? <div className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle" data-bs-toggle="dropdown" style={{ cursor: "pointer" }}>
                            <img
                                src={`${profile}`}
                                alt="Profile"
                                style={{ borderRadius: "50%", height: "3rem", marginRight: "1rem", cursor: "pointer" }}
                            />
                        </div>
                        <div className="dropdown-menu m-0" style={{ top: "4rem", left: "-7rem" }}>
                            <p className="dropdown-item">{fullName}</p>
                            <p className="dropdown-item">Thông tin cá nhân</p>
                            <p className="dropdown-item">Lịch sử mua hàng</p>
                            <p className="dropdown-item">Đổi mật khẩu</p>
                            <button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button>
                        </div>
                    </div> : <Link to="/login" className="btn btn-primary py-2 px-4">
                        Đăng nhập
                    </Link>}
                    <div style={{display: "flex", alignItems: "center"}} onClick={handleUserCart}>
                        <button className="btn btn-link">
                            <FontAwesomeIcon icon={faCartPlus} className="fa fa-3x fa-user-tie text-primary mb"/>
                            <span className="badge bg-primary" style={{fontSize: "1rem"}}>{cart.length}</span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    </>
}