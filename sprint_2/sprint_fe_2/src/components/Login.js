import {Header} from "./Header";
import {CartProvider} from "./CartContext";
import "./css/style.css";
import "./css/style-login.css";
import {faFacebook, faGooglePlus, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {useEffect, useState} from "react";
import {UserService} from "../service/UserService";
import SweetAlert from "sweetalert";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


export function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errMes, setErrMes] = useState("");
    useEffect(() => {
        const tomoApp = Cookies.get("tomoApp");
        const profile = Cookies.get("profile");
        const fullName = Cookies.get("fullName");
        const role = Cookies.get("role");
        const userId = Cookies.get("userId");
        const userEmail = Cookies.get("userEmail");
        if (role !== undefined || tomoApp !== undefined || profile !== undefined || fullName !== undefined || userId !== undefined || userEmail !== undefined) {
            navigate("/");
        }
    }, []);

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    }
    const handelChangrPassword = (e) => {
        setPassword(e.target.value);
    }
    const handleLogin = async () => {
        if (password === "" || userName === "") {
            setErrMes("Tên tài khoản và mật khẩu không được để trống!");
        } else {
            try {
                const param = {
                    userName: userName,
                    password: password
                }
                const res = await UserService.handleLogin(param);
                setErrMes("");
                setPassword("");
                setUserName("");
                Cookies.set("roles", res.data.role);
                Cookies.set("fullName", res.data.fullName);
                Cookies.set("profile", res.data.profile);
                Cookies.set("userId", res.data.id);
                Cookies.set("userEmail", res.data.email);
                Cookies.set("tomoApp", "tomoApp");
                sessionStorage.setItem("isLogin", "true");
                const isPayment = sessionStorage.getItem("isPayment");
                if (isPayment !== null){
                    sessionStorage.removeItem("isPayment");
                    navigate("/user-cart");
                } else {
                    navigate("/");
                }
                console.log(res);
            } catch (error) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 400) {
                        setErrMes("Tên tài khoản hoặc mật khẩu không hợp lệ!");
                    } else if (status === 403) {
                        await SweetAlert("Thất bại!", `Đăng nhập thất bại. Tài khoản của bạn đã bị khóa bởi hệ thống. Nếu thắc mắc xin vui lòng liên hệ đến 0362466363!`, "error");
                    }
                } else {
                    console.error("Lỗi:", error);
                }
            }
        }
    }
    return <>
        <CartProvider>
            <div className="container-xxl bg-white p-0">
                <div className="container-xxl position-relative p-0">
                    <div className="container-xxl py-5 bg-dark hero-header1">
                        <div className="container my-5 py-5" style={{height: "100%"}}>
                            <Header/>
                            <div className="row align-items-center g-5">
                                <section className="form-02-main">
                                    <div className="container">
                                        <div
                                            className="row justify-content-center">
                                            <div
                                                className="col-lg-6 col-md-8 col-sm-10">
                                                <div className="_lk_de">
                                                    <div className="form-03-main">
                                                        <div className="logo">
                                                            <img src="https://www.pngrepo.com/download/210993/user.png"
                                                                 className="img-fluid" alt={"profile"}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                className="form-control _ge_de_ol"
                                                                placeholder="Tên đăng nhập"
                                                                required=""
                                                                aria-required="true"
                                                                onChange={handleChangeUserName}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                className="form-control _ge_de_ol"
                                                                placeholder="Mật khẩu"
                                                                required=""
                                                                aria-required="true"
                                                                onChange={handelChangrPassword}
                                                            />
                                                        </div>
                                                        <div style={{color: "red", textAlign: "center"}}>
                                                            <span>{errMes}</span></div>
                                                        <div className="checkbox form-group">
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    value=""
                                                                    id=""
                                                                />
                                                                <label className="form-check-label" htmlFor="">
                                                                    Ghi nhớ
                                                                </label>
                                                            </div>
                                                            <a href="#">Quên mật khẩu?</a>
                                                        </div>
                                                        <div className="form-group">
                                                            <button className="_btn_04" onClick={handleLogin}>
                                                                Đăng nhập
                                                            </button>
                                                        </div>
                                                        <div className="form-group nm_lk" style={{textAlign: "center"}}>
                                                            <p>Hoặc đăng nhập với</p>
                                                        </div>
                                                        <div className="form-group pt-2">
                                                            <div className="_social_04">
                                                                <ol style={{paddingRight: "32px"}}>
                                                                    <li style={{marginRight: "10px"}}>
                                                                        <FontAwesomeIcon icon={faFacebook}/>
                                                                    </li>
                                                                    <li>
                                                                        <FontAwesomeIcon icon={faTwitter}/>
                                                                    </li>
                                                                    <li>
                                                                        <FontAwesomeIcon icon={faGooglePlus}/>
                                                                    </li>
                                                                    <li>
                                                                        <FontAwesomeIcon icon={faInstagram}/>
                                                                    </li>
                                                                    <li>
                                                                        <FontAwesomeIcon icon={faLinkedin}/>
                                                                    </li>
                                                                </ol>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CartProvider>
    </>;
}