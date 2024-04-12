import {Header} from "./Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRecycle} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
import {CartProvider, useCart} from "./CartContext";
import "./css/style.css";
import {Footer} from "./Footer";
import {useEffect} from "react";
import SweetAlert from "sweetalert";
import Cookies from "js-cookie";
import {BookingService} from "../service/BookingService";

export function HomeBoby() {
    const navigate = useNavigate();
    const handleBooking = () => {
        navigate('/list-product/1');
    }
    const {removeToCart} = useCart();
    const alertBooking = async () => {
        const bookingStatus = Cookies.get("bookingStatus");
        console.log(bookingStatus)
        if (bookingStatus === "Ok"){
            await removeToCart();
            Cookies.remove("idBooking");
            await SweetAlert("Thành công!", `Bạn đã thanh toán đơn hàng thành công! Mọi thông tin về đơn hàng đã được gửi đến email của bạn! Đơn hàng sẽ đến đúng hạn giao. Nếu có thắc mắc hay liên hệ với chúng tôi. Trân trọng cám ơn!`, "success");
        } else if (bookingStatus === "Fail") {
            Cookies.remove("idBooking");
            await SweetAlert("Thất bại!", `Đã xảy ra lỗi trong quá trình thanh toán xin vui lòng thao tác lại hoặc liên hệ với chúng tôi trân trọng cám ơn!`, "error");
        }
        const removeCookie = async () => {
            try {
                const res = await BookingService.removeCookie();
            } catch (err){
                console.log(err);
            }
        }
        removeCookie();
    }
    useEffect(() => {
      alertBooking();
    },[])
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
    return <>

            <div className="container-xxl bg-white p-0">
                {/* Spinner Start */}
                {/*<div*/}
                {/*    id="spinner"*/}
                {/*    className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"*/}
                {/*>*/}
                {/*    <div*/}
                {/*        className="spinner-border text-primary"*/}
                {/*        style={{ width: "3rem", height: "3rem" }}*/}
                {/*        role="status"*/}
                {/*    >*/}
                {/*        <span className="sr-only">Loading...</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/* Spinner End */}
                {/* Navbar & Hero Start */}

                <div className="container-xxl position-relative p-0">
                    <div className="container-xxl py-5 bg-dark hero-header1 mb-5">
                        <div className="container my-5 py-5">
                            <Header/>
                            <div className="row align-items-center g-5">
                                <div className="col-lg-6 text-center text-lg-start">
                                    <h1 className="display-3 text-white animated slideInLeft">
                                        Chào mừng đến với
                                        <br/>
                                        Tomo Shop
                                    </h1>
                                    <p className="text-white animated slideInLeft mb-4 pb-2">
                                        Tại Tomo Shop, chúng tôi hiểu rằng việc cung cấp thức ăn cho chó con, chó mẹ và
                                        chó
                                        trưởng thành là một phần quan trọng của cuộc sống hàng ngày. Đó là lý do tại sao
                                        chúng tôi cung cấp dòng sản phẩm thức ăn cho chó chất lượng cao, đảm bảo rằng
                                        chó
                                        cưng của bạn nhận được tất cả các chất dinh dưỡng cần thiết cho sự phát triển
                                        khỏe
                                        mạnh.
                                    </p>
                                    <button
                                        className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft"
                                        onClick={handleBooking}
                                    >
                                        Mua hàng
                                    </button>
                                </div>
                                <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                                    <img className="img-fluid" style={{ animation: "imgRotate 50s linear infinite"}}
                                         src="https://media.istockphoto.com/id/165907425/vi/anh/th%E1%BB%A9c-%C4%83n-cho-ch%C3%B3.jpg?s=612x612&w=0&k=20&c=DPZNgtK51yRQoqVaY3BfODlopNRKghv3014UQZDbXJE="
                                         alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Navbar & Hero End */}
                {/* Service Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="service-item rounded pt-3">
                                    <div className="p-4">
                                        <i className="fa fa-3x fa-user-tie text-primary mb-4"/>
                                        <h5>Nhân viên</h5>
                                        <p>
                                            Chúng tôi sẵn sàng lắng nghe những ý kiến, đóng góp từ phía các bạn và sẵn
                                            sàng
                                            thay đổi để cung cấp những sản phẩm tốt nhất.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="service-item rounded pt-3">
                                    <div className="p-4">
                                        <FontAwesomeIcon className="fa fa-3x fa-user-tie text-primary mb-4"
                                                         icon={faRecycle}/>
                                        <h5>Diễn đàn</h5>
                                        <p>
                                            Hãy theo dõi diễn đàn để có thể nắm bắt được những thay đổi về giá cả cũng
                                            như
                                            những chính sách hỗ trợ bạn nhé.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="service-item rounded pt-3">
                                    <div className="p-4">
                                        <i className="fa fa-3x fa-cart-plus text-primary mb-4"/>
                                        <h5>Đặt hàng online</h5>
                                        <p>
                                            Với phương châm "Khách hàng là thượng đế". Hãy cùng chúng tôi chọn lựa những
                                            sản
                                            phẩm phù hợp nhé.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                                <div className="service-item rounded pt-3">
                                    <div className="p-4">
                                        <i className="fa fa-3x fa-headset text-primary mb-4"/>
                                        <h5>Hỗ trợ 24/7</h5>
                                        <p>
                                            Hệ thống luôn luôn sẵn sàng tư vấn và hỗ trợ 24/7 giúp các bạn có những trải
                                            nghiệm tốt mọi lúc mọi nơi.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Service End */}
                {/* About Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-6">
                                <div className="row g-3">
                                    <div className="col-6 text-start">
                                        <img
                                            className="img-fluid rounded w-100 wow zoomIn"
                                            data-wow-delay="0.1s"
                                            src="img/about-1.jpg"
                                        />
                                    </div>
                                    <div className="col-6 text-start">
                                        <img
                                            className="img-fluid rounded w-75 wow zoomIn"
                                            data-wow-delay="0.3s"
                                            src="img/about-2.jpg"
                                            style={{marginTop: "25%"}}
                                        />
                                    </div>
                                    <div className="col-6 text-end">
                                        <img
                                            className="img-fluid rounded w-75 wow zoomIn"
                                            data-wow-delay="0.5s"
                                            src="img/about-3.jpg"
                                        />
                                    </div>
                                    <div className="col-6 text-end">
                                        <img
                                            className="img-fluid rounded w-100 wow zoomIn"
                                            data-wow-delay="0.7s"
                                            src="img/about-4.jpg"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                                    About Us
                                </h5>
                                <h1 className="mb-4">
                                    Welcome to <i className="fa fa-utensils text-primary me-2"/>
                                    Restoran
                                </h1>
                                <p className="mb-4">
                                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                                    diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem
                                    sit.
                                </p>
                                <p className="mb-4">
                                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                                    diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                                    lorem sit clita duo justo magna dolore erat amet
                                </p>
                                <div className="row g-4 mb-4">
                                    <div className="col-sm-6">
                                        <div
                                            className="d-flex align-items-center border-start border-5 border-primary px-3">
                                            <h1
                                                className="flex-shrink-0 display-5 text-primary mb-0"
                                                data-toggle="counter-up"
                                            >
                                                15
                                            </h1>
                                            <div className="ps-4">
                                                <p className="mb-0">Years of</p>
                                                <h6 className="text-uppercase mb-0">Experience</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div
                                            className="d-flex align-items-center border-start border-5 border-primary px-3">
                                            <h1
                                                className="flex-shrink-0 display-5 text-primary mb-0"
                                                data-toggle="counter-up"
                                            >
                                                50
                                            </h1>
                                            <div className="ps-4">
                                                <p className="mb-0">Popular</p>
                                                <h6 className="text-uppercase mb-0">Master Chefs</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="btn btn-primary py-3 px-5 mt-2" href="">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* About End */}
                {/* Menu Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                                Food Menu
                            </h5>
                            <h1 className="mb-5">Most Popular Items</h1>
                        </div>
                        <div
                            className="tab-class text-center wow fadeInUp"
                            data-wow-delay="0.1s"
                        >
                            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                                <li className="nav-item">
                                    <a
                                        className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                                        data-bs-toggle="pill"
                                        href="#tab-1"
                                    >
                                        <i className="fa fa-coffee fa-2x text-primary"/>
                                        <div className="ps-3">
                                            <small className="text-body">Popular</small>
                                            <h6 className="mt-n1 mb-0">Breakfast</h6>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="d-flex align-items-center text-start mx-3 pb-3"
                                        data-bs-toggle="pill"
                                        href="#tab-2"
                                    >
                                        <i className="fa fa-hamburger fa-2x text-primary"/>
                                        <div className="ps-3">
                                            <small className="text-body">Special</small>
                                            <h6 className="mt-n1 mb-0">Launch</h6>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="d-flex align-items-center text-start mx-3 me-0 pb-3"
                                        data-bs-toggle="pill"
                                        href="#tab-3"
                                    >
                                        <i className="fa fa-utensils fa-2x text-primary"/>
                                        <div className="ps-3">
                                            <small className="text-body">Lovely</small>
                                            <h6 className="mt-n1 mb-0">Dinner</h6>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="tab-1" className="tab-pane fade show p-0 active">
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-1.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-2.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-3.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-4.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-5.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-6.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-7.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-8.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-2" className="tab-pane fade show p-0">
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-1.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-2.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-3.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-4.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-5.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-6.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-7.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-8.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-3" className="tab-pane fade show p-0">
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-1.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-2.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-3.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-4.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-5.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-6.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-7.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="flex-shrink-0 img-fluid rounded"
                                                    src="img/menu-8.jpg"
                                                    alt=""
                                                    style={{width: 80}}
                                                />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>Chicken Burger</span>
                                                        <span className="text-primary">$115</span>
                                                    </h5>
                                                    <small className="fst-italic">
                                                        Ipsum ipsum clita erat amet dolor justo diam
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Menu End */}
                {/* Reservation Start */}
                <div className="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="row g-0">
                        <div className="col-md-6">
                            <div className="video">
                                <button
                                    type="button"
                                    className="btn-play"
                                    data-bs-toggle="modal"
                                    data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                                    data-bs-target="#videoModal"
                                >
                                    <span/>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 bg-dark d-flex align-items-center">
                            <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
                                <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                                    Reservation
                                </h5>
                                <h1 className="text-white mb-4">Book A Table Online</h1>
                                <form>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Your Name"
                                                />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Your Email"
                                                />
                                                <label htmlFor="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div
                                                className="form-floating date"
                                                id="date3"
                                                data-target-input="nearest"
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control datetimepicker-input"
                                                    id="datetime"
                                                    placeholder="Date & Time"
                                                    data-target="#date3"
                                                    data-toggle="datetimepicker"
                                                />
                                                <label htmlFor="datetime">Date &amp; Time</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select className="form-select" id="select1">
                                                    <option value={1}>People 1</option>
                                                    <option value={2}>People 2</option>
                                                    <option value={3}>People 3</option>
                                                </select>
                                                <label htmlFor="select1">No Of People</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                    <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="message"
                        style={{height: 100}}
                        defaultValue={""}
                    />
                                                <label htmlFor="message">Special Request</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal fade"
                    id="videoModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content rounded-0">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Youtube Video
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                {/* 16:9 aspect ratio */}
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        className="embed-responsive-item"
                                        src=""
                                        id="video"
                                        allowFullScreen=""
                                        allowscriptaccess="always"
                                        allow="autoplay"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Reservation Start */}
                {/* Team Start */}
                <div className="container-xxl pt-5 pb-3">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                                Team Members
                            </h5>
                            <h1 className="mb-5">Our Master Chefs</h1>
                        </div>
                        <div className="row g-4">
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="team-item text-center rounded overflow-hidden">
                                    <div className="rounded-circle overflow-hidden m-4">
                                        <img className="img-fluid" src="img/team-1.jpg" alt=""/>
                                    </div>
                                    <h5 className="mb-0">Full Name</h5>
                                    <small>Designation</small>
                                    <div className="d-flex justify-content-center mt-3">
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-facebook-f"/>
                                        </a>
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-twitter"/>
                                        </a>
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-instagram"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="team-item text-center rounded overflow-hidden">
                                    <div className="rounded-circle overflow-hidden m-4">
                                        <img className="img-fluid" src="img/team-2.jpg" alt=""/>
                                    </div>
                                    <h5 className="mb-0">Full Name</h5>
                                    <small>Designation</small>
                                    <div className="d-flex justify-content-center mt-3">
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-facebook-f"/>
                                        </a>
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-twitter"/>
                                        </a>
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-instagram"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="team-item text-center rounded overflow-hidden">
                                    <div className="rounded-circle overflow-hidden m-4">
                                        <img className="img-fluid" src="img/team-3.jpg" alt=""/>
                                    </div>
                                    <h5 className="mb-0">Full Name</h5>
                                    <small>Designation</small>
                                    <div className="d-flex justify-content-center mt-3">
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-facebook-f"/>
                                        </a>
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-twitter"/>
                                        </a>
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-instagram"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                                <div className="team-item text-center rounded overflow-hidden">
                                    <div className="rounded-circle overflow-hidden m-4">
                                        <img className="img-fluid" src="img/team-4.jpg" alt=""/>
                                    </div>
                                    <h5 className="mb-0">Full Name</h5>
                                    <small>Designation</small>
                                    <div className="d-flex justify-content-center mt-3">
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-facebook-f"/>
                                        </a>
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-twitter"/>
                                        </a>
                                        <a className="btn btn-square btn-primary mx-1" href="">
                                            <i className="fab fa-instagram"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Team End */}
                {/* Testimonial Start */}
                <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="container">
                        <div className="text-center">
                            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                                Testimonial
                            </h5>
                            <h1 className="mb-5">Our Clients Say!!!</h1>
                        </div>
                        <div className="owl-carousel testimonial-carousel">
                            <div className="testimonial-item bg-transparent border rounded p-4">
                                <i className="fa fa-quote-left fa-2x text-primary mb-3"/>
                                <p>
                                    Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
                                    stet amet eirmod eos labore diam
                                </p>
                                <div className="d-flex align-items-center">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-circle"
                                        src="img/testimonial-1.jpg"
                                        style={{width: 50, height: 50}}
                                    />
                                    <div className="ps-3">
                                        <h5 className="mb-1">Client Name</h5>
                                        <small>Profession</small>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-item bg-transparent border rounded p-4">
                                <i className="fa fa-quote-left fa-2x text-primary mb-3"/>
                                <p>
                                    Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
                                    stet amet eirmod eos labore diam
                                </p>
                                <div className="d-flex align-items-center">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-circle"
                                        src="img/testimonial-2.jpg"
                                        style={{width: 50, height: 50}}
                                    />
                                    <div className="ps-3">
                                        <h5 className="mb-1">Client Name</h5>
                                        <small>Profession</small>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-item bg-transparent border rounded p-4">
                                <i className="fa fa-quote-left fa-2x text-primary mb-3"/>
                                <p>
                                    Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
                                    stet amet eirmod eos labore diam
                                </p>
                                <div className="d-flex align-items-center">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-circle"
                                        src="img/testimonial-3.jpg"
                                        style={{width: 50, height: 50}}
                                    />
                                    <div className="ps-3">
                                        <h5 className="mb-1">Client Name</h5>
                                        <small>Profession</small>
                                    </div>
                                </div>
                            </div>
                            <div className="testimonial-item bg-transparent border rounded p-4">
                                <i className="fa fa-quote-left fa-2x text-primary mb-3"/>
                                <p>
                                    Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor
                                    stet amet eirmod eos labore diam
                                </p>
                                <div className="d-flex align-items-center">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-circle"
                                        src="img/testimonial-4.jpg"
                                        style={{width: 50, height: 50}}
                                    />
                                    <div className="ps-3">
                                        <h5 className="mb-1">Client Name</h5>
                                        <small>Profession</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Testimonial End */}
                {/* Footer Start */}
                <Footer/>
            </div>
    </>;
}