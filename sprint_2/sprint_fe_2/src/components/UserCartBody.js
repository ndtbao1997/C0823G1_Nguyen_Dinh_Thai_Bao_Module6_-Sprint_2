import {useEffect, useState} from "react";
import {useCart} from "./CartContext";
import {ProductService} from "../service/ProductService";
import {Header} from "./Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Footer} from "./Footer";
import {ErrorMessage, Field, Formik, Form} from "formik";
import * as Yup from "yup";
import {Modal} from "react-bootstrap";
import {BookingService} from "../service/BookingService";
import SweetAlert from "sweetalert";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import CountdownClock from "./CountdownClock";

export function UserCartBody() {
    const [status, setStatus] = useState(1);
    const {cart} = useCart();
    const [listProduct, setListProduct] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin = sessionStorage.getItem("isLogin");
        if (isLogin !== null){
            const fullName = Cookies.get("fullName");
            SweetAlert("Thành công!", `Chào mừng ${fullName} đến với hệ thống! Chúc bạn có những trải nghiệm thật vui vẻ!`, "success");
            sessionStorage.removeItem("isLogin");
        }
        const isLogout = sessionStorage.getItem("isLogout");
        if (isLogout !== null){
            const fullName = Cookies.get("fullName");
            SweetAlert("Thành công!", `Cám ơn bạn đã có những trải nghiệm với hệ thống của chúng tôi! Chúc bạn có một ngày thật vui vẻ!`, "success");
            sessionStorage.removeItem("isLogout");
        }
    })
    const fetchData = async () => {
        const fullName = Cookies.get("fullName");
        if (fullName !== undefined){
            setUserFullName(fullName);
        }
        const userEmail = Cookies.get("userEmail");
        if (userEmail !== undefined){
            setUserEmail(userEmail);
        }
        let productIdArray = [];
        for (let i = 0; i < cart.length; i++) {
            productIdArray.push(cart[i].id);
        }
        console.log(productIdArray);
        try {
            const res = await ProductService.findAllProductFromCart(productIdArray);
            setListProduct(res.data);
            console.log(listProduct);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        fetchData();
    }, [cart])

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const {plusToCart, minusToCart} = useCart();
    const [show, setShow] = useState(false);

    const handlePlusToCart = (id) => {
        const value = cart.map(item => {
            if (item.id === id) {
                return item.value;
            }
        })
        if (value === 1) {
            plusToCart(id);
        } else {
            plusToCart(id);
        }
    }
    const handleMinusToCart = (id) => {
        const value = cart.find(item => item.id === id)?.value;
        if (value === 1) {
            minusToCart(id);
            fetchData();
        } else {
            minusToCart(id);
        }
    }

    let total = 0;
    listProduct.forEach(product => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
            total += cartItem.value * product.price;
        }
    });
    const [submitValue, setSubmitValue] = useState({});
    const handleSubmit1 = (values) => {
        setSubmitValue(values);
        setShow(true);
    }
    const handleSubmit2 = async () => {
        let submitArray = [];
        let item;
        for (let i = 0; i < cart.length; i++) {
            item = {};
            item.id = cart[i].id;
            item.value = cart[i].value;
            for (let j = 0; j < listProduct.length; j++) {
                if (cart[i].id === listProduct[j].id) {
                    item.price = listProduct[j].price;
                    break;
                }
            }
            submitArray.push(item);
            item = {};
        }
        let id = 0;
        const userId = Cookies.get("userId");
        if (userId !== undefined){
            id = userId;
        }
        const param = {
            email: submitValue.email,
            fullName: submitValue.fullName,
            phoneNumber: submitValue.phoneNumber,
            address: submitValue.address,
            listProduct: submitArray,
            userId: id
        }
        try {
            const res = await BookingService.setBooking(param);
            console.log(res);
            setStatus(3);
            Cookies.set("idBooking", res.data, { expires: 1/24 });
            setShow(false);
        } catch (err) {
            setShow(false);
            SweetAlert("Th", "aaa", "error")
        }
    }
    const hanleSchema1 = Yup.object({
        email: Yup.string().required("Không được để trống").email(`Định dạng email không hợp lệ! Ví dụ: "Example@gmail.com"`),
        fullName: Yup.string()
            .required('Không được để trống')
            .matches(/^[\p{L} ]+$/u, 'Tên không hợp lệ. Vui lòng nhập đúng định dạng.'),
        phoneNumber: Yup.string()
            .required('Không được để trống')
            .matches(/^\d{10}$/, 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại gồm 10 chữ số.'),
        address: Yup.string()
            .required('Không được để trống')
    })

    const handlePayment= async () =>  {
        const bookingId = Cookies.get("idBooking");
        try {
            const res = await BookingService.handlePayment(bookingId);
            window.location.href = res.data.url;
            console.log(res)
        }catch (err){
            console.log(err);
        }
    }


    const handleClose = () => {
        setShow(false);
    }
    const handleClick1 = async () => {
        setStatus(1);
        const idBooking = Cookies.get("idBooking");
        if (idBooking !== undefined){
            try {
                const res = BookingService.removeBooking(idBooking);
                Cookies.remove("idBooking");
            } catch (err){
                console.log(err)
            }
        }
    }
    const handleClick2 = async () => {
        setStatus(2);
        const idBooking = Cookies.get("idBooking");
        if (idBooking !== undefined){
            try {
                const res = BookingService.removeBooking(idBooking);
                Cookies.remove("idBooking");
            } catch (err){
                console.log(err)
            }
        }
    }
    const handlePaymentByPoint = async () => {
        const tomoApp = Cookies.get("tomoApp");
        const profile = Cookies.get("profile");
        const fullName = Cookies.get("fullName");
        const role = Cookies.get("roles");
        const userId = Cookies.get("userId");
        const userEmail = Cookies.get("userEmail");
        const idBooking = Cookies.get("idBooking");

        if (role === undefined || tomoApp === undefined || profile === undefined || fullName === undefined || userId === undefined || userEmail === undefined) {
            const idBooking = Cookies.get("idBooking");
            if (idBooking !== undefined){
                try {
                    const res = await BookingService.removeBooking(idBooking);
                    Cookies.remove("idBooking");
                } catch (err){
                    console.log(err)
                }
            }
            sessionStorage.setItem("isPayment","isPayment");
            navigate("/login");
        }
            try {
                const res = await BookingService.handlePaymentByPoint(idBooking);
                Cookies.remove("idBooking");
                navigate("/")
                console.log(res)
            }catch (err){
                SweetAlert("Thất bại", "Điểm tích lũy của bạn không đủ! Vui lòng chọn phương thức thanh toán khác!", "error")
            }

    }


    return <>
        <div className="container-xxl bg-white p-0">
            {/*Spinner Start */}
            {/*{listProduct.length === 0 ? <div*/}
            {/*    id="spinner"*/}
            {/*    className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"*/}
            {/*>*/}
            {/*    <div*/}
            {/*        className="spinner-border text-primary"*/}
            {/*        style={{width: "3rem", height: "3rem"}}*/}
            {/*        role="status"*/}
            {/*    >*/}
            {/*        <span className="sr-only">Loading...</span>*/}
            {/*    </div>*/}
            {/*</div> : ""}*/}
            {/*Spinner End */}
            {/*Navbar & Hero Start */}
            <div className="container-xxl position-relative p-0">
                <div className="container-xxl py-5 bg-dark hero-header1 mb-5">
                    <Header/>
                    <div className="container text-center my-5 pt-5 pb-4">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                            Giỏ hàng của bạn
                        </h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item">
                                    <a href="#">Trang chủ</a>
                                </li>
                                <li
                                    className="breadcrumb-item text-white active"
                                    aria-current="page"
                                >
                                    Giỏ hàng của bạn
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Navbar & Hero End */}
            {/* Menu Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                            Chi tiết
                        </h5>
                        <h1 className="mb-5">Giỏ hàng</h1>
                    </div>
                    <nav style={{marginBottom: "2rem"}}
                         className="breadcrumbs flex-row flex-row-center heading-font checkout-breadcrumbs text-center strong h3 uppercase">
                        <a style={{marginRight: "1rem"}} onClick={handleClick1}>
                            <span className="breadcrumb-step hide-for-small">
                                <span
                                    className={status === 1 ? "circle-number" : "circle-number1"}>1</span> {status === 1 ?
                                <span style={{fontSize: "1.25rem", color: "black"}}>Thông tin giỏ hàng  </span> :
                                <span className={"text-primary"}
                                      style={{fontSize: "1.25rem"}}>Thông tin giỏ hàng  </span>}
                            </span> </a>
                        <a style={{marginRight: "1rem"}} onClick={handleClick2}>
                            <span className="breadcrumb-step hide-for-small">
                                <span
                                    className={status === 2 ? "circle-number" : "circle-number1"}>2</span> {status === 2 ?
                                <span style={{fontSize: "1.25rem", color: "black"}}>Điền thông tin cá nhân  </span> :
                                <span className={"text-primary"}
                                      style={{fontSize: "1.25rem"}}>Điền thông tin cá nhân  </span>}
                            </span> </a>
                        <a style={{marginRight: "1rem"}}>
                            <span className="breadcrumb-step hide-for-small">
                                <span
                                    className={status === 3 ? "circle-number" : "circle-number1"}>3</span> {status === 3 ?
                                <span style={{fontSize: "1.25rem", color: "black"}}>Xác nhận thanh toán  </span> :
                                <span className={"text-primary"}
                                      style={{fontSize: "1.25rem"}}>Xác nhận thanh toán  </span>}
                            </span> </a>
                    </nav>
                    {listProduct.length === 0 ?
                        <h1 style={{textAlign: "center"}}>Hiện tại không có sản phẩm nào trong giỏ hàng!</h1> :
                        <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.1s">
                            <div className="tab-content">
                                <div id="tab-1" className="tab-pane fade show p-0 active">
                                    <div className="row g-4">
                                        {status === 1 ? <div className="col-lg-7" style={{paddingRight: "2rem"}}>
                                            {listProduct.map(product => (
                                                <div style={{marginTop: "3rem"}} key={product.id}>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            className="flex-shrink-0 img-fluid rounded"
                                                            src={`${product.profile}`}
                                                            alt=""
                                                            style={{width: 100}}
                                                        />
                                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                                <span>Hãng sản xuất: {product.trademark}</span>
                                                                <span
                                                                    className="text-danger">{formatter.format(product.price)}</span>
                                                            </h5>
                                                            <small className="fst-italic">{product.productName}</small>
                                                            <div className="d-flex align-items-center mt-2">
                                                                {/* 5 dấu sao */}
                                                                <div>
                                                                    {Array.from({length: 5}, (_, index) => (
                                                                        <i key={index}
                                                                           className="fa fa-star text-warning me-1"></i>
                                                                    ))}
                                                                </div>
                                                                <h6 style={{marginTop: "0.4rem", marginLeft: "0.5rem"}}>
                                                                    {product.weight >= 1 ?
                                                                        <span>Trọng lượng : {(product.weight).toFixed(1)}kg</span> :
                                                                        <span>Trọng lượng : {(product.weight * 1000).toFixed(0)}g</span>}

                                                                </h6>
                                                                {cart.map(item => {
                                                                    if (item.id === product.id) {
                                                                        return item.value === 10 ? <div className="ms-auto"></div> :  <button
                                                                            className="btn btn-primary ms-auto"
                                                                            onClick={() => handlePlusToCart(product.id)}>
                                                                            <FontAwesomeIcon icon={faPlus}/>
                                                                        </button>;
                                                                    }
                                                                })}
                                                                <div
                                                                    className="text-center d-flex justify-content-center align-items-center mx-2"
                                                                    style={{
                                                                        width: '3rem',
                                                                        height: '3rem',
                                                                        borderRadius: "20%",
                                                                        border: `0.1rem solid black`
                                                                    }}
                                                                >
                                                                    <h5 style={{marginTop: "0.4rem"}}>
                                                                        {cart.map(item => {
                                                                            if (item.id === product.id) {
                                                                                return item.value;
                                                                            }
                                                                        })}
                                                                    </h5>
                                                                </div>
                                                                <button className="btn btn-secondary"
                                                                        onClick={() => handleMinusToCart(product.id)}
                                                                >
                                                                    <FontAwesomeIcon icon={faMinus}/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> : ""}
                                        {status === 2 ? <div className="col-lg-6 p-4" style={{
                                            border: "0.05rem solid var(--primary)",
                                            marginRight: "6.625rem"
                                        }}>
                                            <div className="col-inner has-border">
                                                <div>
                                                    <h3>Điền thông tin thanh toán</h3>
                                                </div>
                                                <Formik initialValues={{
                                                    email: userEmail !== "" ? userEmail : "",
                                                    fullName: userFullName !== "" ? userFullName : "",
                                                    phoneNumber: "",
                                                    address: "",
                                                }} onSubmit={handleSubmit1}
                                                        validationSchema={hanleSchema1}>
                                                    <Form>
                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                                <b>Email</b><span
                                                                className="red-dot">&nbsp;*</span>
                                                            </div>
                                                            <div className="col">
                                                                <Field type="text" className="form-control"
                                                                       placeholder="Example@gmail.com" name="email"   disabled={userEmail !== ""}/>
                                                                <ErrorMessage name="email" component='p'
                                                                              className="form-err"
                                                                              style={{color: 'red', fontSize: "1rem"}}/>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                                <b>Họ và tên</b><span
                                                                className="red-dot">&nbsp;*</span>
                                                            </div>
                                                            <div className="col">
                                                                <Field type="text" placeholder="Nguyễn Văn A"
                                                                       className="form-control"
                                                                       name="fullName"  disabled={userFullName !== ""}/>
                                                                <ErrorMessage name="fullName" component='p'
                                                                              className="form-err"
                                                                              style={{color: 'red', fontSize: "1rem"}}/>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                                <b>Số điện thoại</b><span
                                                                className="red-dot">&nbsp;*</span>
                                                            </div>
                                                            <div className="col">
                                                                <Field type="text" className="form-control"
                                                                       placeholder="0362466363"
                                                                       name="phoneNumber"/>
                                                                <ErrorMessage name="phoneNumber" component='p'
                                                                              className="form-err"
                                                                              style={{color: 'red', fontSize: "1rem"}}/>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-3 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                                <b>Địa chỉ</b><span
                                                                className="red-dot">&nbsp;*</span>
                                                            </div>
                                                            <div className="col">
                                                                <Field type="text" className="form-control"
                                                                       placeholder="Đông Dương Land, quận Ngũ Hành Sơn, Đà Nẵng"
                                                                       name="address"/>
                                                                <ErrorMessage name="address" component='p'
                                                                              className="form-err"
                                                                              style={{color: 'red', fontSize: "1rem"}}/>
                                                            </div>
                                                        </div>
                                                        <button type={"submit"}
                                                                className="btn btn-danger py-2 px-4"
                                                                style={{width: "100%", marginTop: "2rem"}}
                                                        >
                                                            Xác nhận thanh toán
                                                        </button>
                                                    </Form>
                                                </Formik>
                                            </div>
                                        </div> : ""}
                                        {status === 3 ? <div className="col-lg-6 p-4" style={{
                                            border: "0.05rem solid var(--primary)",
                                            marginRight: "6.625rem"
                                        }}>
                                            <div className="col-inner has-border">
                                                <div>
                                                    <h3>Thông tin giao hàng</h3>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-3 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                        <b>Email :</b>
                                                    </div>
                                                    <div className="col-9 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                        <b> {submitValue.email}</b>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-3 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                        <b>Họ và tên :</b>
                                                    </div>
                                                    <div className="col-9 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                        <b> {submitValue.fullName}</b>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-3 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                        <b>Số điện thoại :</b>
                                                    </div>
                                                    <div className="col-9 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                        <b>{submitValue.phoneNumber}</b>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-3 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                        <b>Địa chỉ :</b>
                                                    </div>
                                                    <div className="col-9 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                        <b>{submitValue.address}</b>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-12 d-flex" style={{marginTop: "0.5rem", fontSize: "1rem"}}>
                                                        <b> {status === 3 ?  <CountdownClock /> : ""}</b>
                                                    </div>
                                                </div>

                                                <button type="submit" className="btn btn-danger py-2 px-4" onClick={handlePayment} style={{width: "100%", marginTop: "2rem"}}>
                                                    Thanh toán bằng VNPay
                                                </button>
                                                <button type="submit" className="btn btn-primary py-2 px-4" onClick={handlePaymentByPoint} style={{width: "100%", marginTop: "1rem"}}>
                                                    Thanh toán bằng điểm tích lũy
                                                </button>
                                            </div>
                                        </div> : ""}
                                        <div className="col-lg-5 p-4" style={{border: "0.05rem solid var(--primary)"}}>
                                            <div className="col-inner has-border">
                                                <div>
                                                    <h3>Đơn hàng của bạn</h3>
                                                    <div>
                                                        <table>
                                                            <thead>
                                                            <tr style={{
                                                                borderBottom: "0.1rem solid black",
                                                                color: "black",
                                                                fontSize: "1.2rem"
                                                            }}>
                                                                <th style={{textAlign: "left", width: "80%"}}>Sản phẩm
                                                                </th>
                                                                <th style={{textAlign: "right", width: "20%"}}>Tạm
                                                                    tính
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {listProduct.map(product =>
                                                                <tr style={{
                                                                    borderBottom: "0.05rem solid black",
                                                                    height: "4rem"
                                                                }}>
                                                                    <td style={{textAlign: "left"}}>
                                                                        {product.productName}&nbsp;×&nbsp;{product.weight >= 1 ?
                                                                        <span>{(product.weight).toFixed(1)}kg</span> :
                                                                        <span>{(product.weight * 1000).toFixed(0)}g</span>}&nbsp;×&nbsp;
                                                                        <strong>{cart.map(item => {
                                                                            if (item.id === product.id) {
                                                                                return item.value;
                                                                            }
                                                                        })}</strong>
                                                                    </td>
                                                                    <th style={{textAlign: "right"}}
                                                                        className={"text-danger"}>{formatter.format(product.price * (cart.find(item => item.id === product.id)?.value || 0))}
                                                                    </th>
                                                                </tr>
                                                            )}
                                                            </tbody>
                                                            <tfoot>
                                                            <tr style={{
                                                                borderBottom: "0.05rem solid black",
                                                                height: "4rem"
                                                            }}>
                                                                <th style={{textAlign: "left", color: "blue"}}>
                                                                    Tạm tính:
                                                                </th>
                                                                <th style={{textAlign: "right"}}
                                                                    className={"text-danger"}>{formatter.format(total)}
                                                                </th>
                                                            </tr>
                                                            <tr style={{
                                                                borderBottom: "0.1rem solid black",
                                                                height: "4rem"
                                                            }}>
                                                                <th style={{textAlign: "left", color: "blue"}}>
                                                                    Thành tiền:
                                                                </th>
                                                                <th style={{textAlign: "right"}}
                                                                    className={"text-danger"}>{formatter.format(total)}
                                                                </th>
                                                            </tr>
                                                            </tfoot>
                                                        </table>
                                                        <div>
                                                            <div>
                                                                <div style={{textAlign: "left", marginTop: "2rem"}}>
                                                                    <label htmlFor="check"></label>
                                                                    <input type="checkbox"></input> &nbsp; <span
                                                                    style={{
                                                                        fontSize: "1rem",
                                                                        fontWeight: "bold",
                                                                        color: "black"
                                                                    }}>Xuất hóa đơn thanh toán*</span>
                                                                </div>
                                                                {status === 1 ? <button onClick={() => setStatus(2)}
                                                                                        className="btn btn-danger py-2 px-4"
                                                                                        style={{
                                                                                            width: "100%",
                                                                                            marginTop: "2rem"
                                                                                        }}
                                                                >
                                                                    Đặt hàng
                                                                </button> : ""}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: "left", marginTop: "2rem"}}>
                                                        <p>
                                                            Chúng tôi sẽ gọi điện lại để tư vấn và xác nhận đơn hàng của
                                                            quý
                                                            khách
                                                            trước khi giao. Thông tin của quý khách sẽ được sử dụng để
                                                            xử lý
                                                            đơn
                                                            hàng này theo{" "}
                                                            <a
                                                                href="https://www.petmart.vn/chinh-sach-bao-mat"
                                                                className="woocommerce-privacy-policy-link"
                                                                target="_blank"
                                                            >
                                                                chính sách riêng tư
                                                            </a>{" "}
                                                            của Tomo Shop.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
            {/* Menu End */}
            {/* Footer Start */}
            <Footer/>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="Modal"
            >
                <Modal.Header>
                    <Modal.Title>Bạn chắc chắn rằng đã nhập đúng địa chỉ giao hàng?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <button className="btn btn-secondary" style={{width: "4rem"}} onClick={handleClose}>
                        Hủy
                    </button>
                    <button className="btn btn-primary" style={{width: "6rem"}}
                            onClick={() => handleSubmit2()}>
                        Đồng ý
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    </>
}