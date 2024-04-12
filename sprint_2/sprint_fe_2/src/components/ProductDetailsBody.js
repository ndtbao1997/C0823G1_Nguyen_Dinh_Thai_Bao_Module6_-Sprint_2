import {useNavigate, useParams} from "react-router-dom";
import {Header} from "./Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faCheckToSlot} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {ProductService} from "../service/ProductService";
import {useCart} from "./CartContext";
import {Footer} from "./Footer";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import SweetAlert from "sweetalert";
import {EvaluateService} from "../service/EvaluateService";
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

export function ProductDetailsBody() {
    const {id} = useParams();
    const [listProduct, setListProduct] = useState([]);
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [cart, setCart] = useState([]);
    const {addToCart} = useCart();
    const [stars,setStars] = useState(0);
    const [listEvaluate,setListEvaluate] = useState([]);
    const fetchData1 = async () => {
        try {
            const res = await EvaluateService.findAllEvaluate(id);
            setListEvaluate(res.data);
        } catch (err){
            console.log(err);
        }
    }
    const handleAddToCart = async (id) => {
        await addToCart(id);
    };
    const fetchData = async () => {
        try {
            const res = await ProductService.findAllByProductId(id);
            setListProduct(res.data);
            setProduct(res.data[0]);
        } catch (err) {
            navigate("/");
        }
    }
    useEffect(() => {
        fetchData();
        fetchData1();
    }, [])
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    const handleSelect = async (id) => {
        try {
            const res = await ProductService.findById(id);
            setProduct(res.data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleSubmit1 = async (values,formikBag) => {
        if (stars === 0) {
            SweetAlert("Thất bại", "Vui lòng đánh giá qua hình thức chọn ngôi sao trước khi gửi đánh giá đi!", "error")
        } else {
            const params = {
                productId: listProduct[0].productId,
                content: values.evaluate,
                email: values.email,
                fullName: values.fullName,
                stars: stars
            }
            try {
                const res = await EvaluateService.handleEvaluate(params);
                setEvaluateStatus(evaluateStatus +1);
                fetchData1();
                formikBag.resetForm();
                SweetAlert("Thành công!", "Cửa hàng Tomo Shop xin tiếp nhận và lắng nghe những đóng góp của bạn! Và sẵn sàng thay đổi để phục vụ một cách chu đáo nhất với người dùng! Xin cám ơn!", "success")
            } catch (err){
                SweetAlert("Thất bại", "Xin vui lòng nhập email và họ tên hợp lệ! Nội dung đánh giá không được vượt quá 1000 kí tự!", "error")
            }
        }
    }
    const handleSchema1 = Yup.object({
        evaluate: Yup.string().required("Không được để trống"),
        email: Yup.string().required("Không được để trống").email(`Định dạng email không hợp lệ! Ví dụ: "Example@gmail.com"`),
        fullName: Yup.string()
            .required('Không được để trống')
            .matches(/^[\p{L} ]+$/u, 'Tên không hợp lệ. Vui lòng nhập đúng định dạng.')
    })
    const [evaluateStatus,setEvaluateStatus] = useState(1);
    return <>
        <div className="container-xxl bg-white p-0">
            {/*Spinner Start */}
            {listProduct.length === 0 ? <div
                id="spinner"
                className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            >
                <div
                    className="spinner-border text-primary"
                    style={{width: "3rem", height: "3rem"}}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div> : ""}
            {/*Spinner End */}
            {/*Navbar & Hero Start */}
            <div className="container-xxl position-relative p-0">
                <div className="container-xxl py-5 bg-dark hero-header1 mb-5">
                    <Header/>
                    <div className="container text-center my-5 pt-5 pb-4">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                            Chi tiết sản phẩm
                        </h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item">
                                    <a href="#">Trang chủ</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="#">Hạt</a>
                                </li>
                                <li
                                    className="breadcrumb-item text-white active"
                                    aria-current="page"
                                >
                                    Chi tiết sản phẩm
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
                    <div className="row">
                        <div className="col-lg-4">
                            <img
                                className="img-fluid rounded"
                                src={product.profile}
                                alt={product.productName}
                            />
                        </div>
                        <div className="col-lg-8">
                            <h2>{product.productName}</h2>
                            <h4>Hãng sản xuất: <span style={{color: "blue"}}>{product.trademark}</span></h4>
                            <h4>Giá: <span style={{color: "red"}}>{formatter.format(product.price)}</span></h4>
                            {product.avgStars === null ?    <div>
                                {Array.from({length: 5}, (_, index) => (
                                    <i key={index}
                                       className="fa fa-star text-warning me-1"></i>
                                ))}  <span>(Có {listEvaluate.length} đánh giá từ khách hàng)</span>
                            </div> : ""}
                            {product.avgStars !== null && product.avgStars < 1.5 ?    <div>
                                {Array.from({length: 1}, (_, index) => (
                                    <i key={index}
                                       className="fa fa-star text-warning me-1"></i>
                                ))}
                                {Array.from({ length: 4 }, (_, index) => (
                                    <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                ))}  <span>(Có {listEvaluate.length} đánh giá từ khách hàng)</span>
                            </div> : ""}
                            {product.avgStars >= 1.5 && product.avgStars < 2.5 ?    <div>
                                {Array.from({length: 2}, (_, index) => (
                                    <i key={index}
                                       className="fa fa-star text-warning me-1"></i>
                                ))}
                                {Array.from({ length: 3 }, (_, index) => (
                                    <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                ))}  <span>(Có {listEvaluate.length} đánh giá từ khách hàng)</span>
                            </div> : ""}
                            {product.avgStars >= 2.5 && product.avgStars < 3.5 ?    <div>
                                {Array.from({length: 3}, (_, index) => (
                                    <i key={index}
                                       className="fa fa-star text-warning me-1"></i>
                                ))}
                                {Array.from({ length: 2 }, (_, index) => (
                                    <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                ))}  <span>(Có {listEvaluate.length} đánh giá từ khách hàng)</span>
                            </div> : ""}
                            {product.avgStars >= 3.5 && product.avgStars < 4.5 ?    <div>
                                {Array.from({length: 4}, (_, index) => (
                                    <i key={index}
                                       className="fa fa-star text-warning me-1"></i>
                                ))}
                                {Array.from({ length: 1 }, (_, index) => (
                                    <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                ))}  <span>(Có {listEvaluate.length} đánh giá từ khách hàng)</span>
                            </div> : ""}
                            {product.avgStars >= 4.5 ?    <div>
                                {Array.from({length: 5}, (_, index) => (
                                    <i key={index}
                                       className="fa fa-star text-warning me-1"></i>
                                ))}  <span>(Có {listEvaluate.length} đánh giá từ khách hàng)</span>
                            </div> : ""}
                            <hr></hr>
                            <h4>Trọng lượng:</h4>
                            <div className="d-flex">
                                {listProduct.map(p => (
                                    <div
                                        className="text-center d-flex justify-content-center align-items-center mx-2"
                                        key={p.id} onClick={() => handleSelect(p.id)}
                                        style={{
                                            width: '5.5rem',
                                            height: '5.5rem',
                                            borderRadius: "20%",
                                            border: `0.1rem solid ${p.id === product.id ? 'black' : 'var(--bs-primary)'}` // Thay đổi màu thành màu xanh lá cây (#00FF00)
                                        }}
                                    >
                                        {p.weight >= 1 ?
                                            <>
                                                <h5 className={p.id === product.id ? "text-black fs-3" : "text-primary fs-3"}>{p.weight}</h5>
                                                <h5 className={p.id === product.id ? "text-black fs-3" : "text-primary fs-3"}>kg</h5>
                                            </>
                                            :
                                            <>
                                                <h5 className={p.id === product.id ? "text-black fs-3" : "text-primary fs-3"}>{(p.weight * 1000).toFixed(0)}</h5>
                                                <h5 className={p.id === product.id ? "text-black fs-3" : "text-primary fs-3"}>g</h5>
                                            </>
                                        }
                                    </div>
                                ))}
                                <button onClick={() => handleAddToCart(product.id)}
                                        className="btn btn-primary ms-auto me-2"
                                        style={{width: "3rem", height: "3rem"}}>
                                    <FontAwesomeIcon icon={faCartPlus}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className={"custom-hr"}></hr>
                <div className="container">
                    {product.infor !== null ? (
                        <>
                            <h5>Thông tin: </h5>
                            <span style={{
                                textAlign: "justify",
                                display: "block",
                                textJustify: "inter-word"
                            }}>{product.infor}</span>
                        </>
                    ) : ""}
                    {product.benefit !== null ? (
                        <>
                            <h5 style={{marginTop: "1rem"}}>Lợi ích: </h5>
                            <span style={{
                                textAlign: "justify",
                                display: "block",
                                textJustify: "inter-word"
                            }}>{product.benefit}</span>
                        </>
                    ) : ""}
                    {product.instruct !== null ? (
                        <>
                            <h5 style={{marginTop: "1rem"}}>Hướng dẫn sử dụng: </h5>
                            <span style={{
                                textAlign: "justify",
                                display: "block",
                                textJustify: "inter-word"
                            }}>{product.instruct}</span>
                        </>
                    ) : ""}
                    {product.note !== null ? (
                        <>
                            <h5 style={{marginTop: "1rem"}}>Ghi chú: </h5>
                            <span style={{
                                textAlign: "justify",
                                display: "block",
                                textJustify: "inter-word"
                            }}>{product.note}</span>
                        </>
                    ) : ""}

                </div>
                <hr className={"custom-hr"}></hr>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-lg-7">
                            <h5 className="nl-type__h1">Đánh giá</h5>
                            <div style={{marginTop: "0.5rem"}}>{listEvaluate.length !== 0 ? <div>
                                {listEvaluate.map(evaluate => (
                                    <> <div style={{marginBottom: "0.5rem"}}> {
                                        Array.from({ length: 5 }, (_, index) => (
                                            <i
                                                key={index}
                                                className={`fa fa-star ${index < evaluate.stars ? 'text-warning' : ''}`}
                                                style={{ color: index < evaluate.stars ? '#FFD700' : '#CCCCCC' }}
                                            ></i>
                                        ))

                                    } </div>
                                        <h6>{evaluate.fullName} - <span style={{ color: '#007bff', fontSize: '0.8rem' }}>{format(new Date(evaluate.evaluateDate), "dd-MM-yyyy HH:mm:ss", { locale: viLocale })}</span> - <span style={{ color: '#007bff', fontSize: '0.8rem' }}><FontAwesomeIcon icon={faCheckToSlot} /> Đánh giá từ người dùng</span></h6>
                                        <span style={{
                                            textAlign: "justify",
                                            display: "block",
                                            textJustify: "inter-word",
                                        }}>{evaluate.content}</span>
                                        <hr></hr>
                                    </>
                                ))}
                            </div> : <p className="woocommerce-noreviews">Chưa có đánh giá nào.</p>}</div>
                        </div>
                        <div className="col-lg-5">
                            <div id="review_form_wrapper">
                                <div id="review_form">
                                    <div id="respond" className="comment-respond">
                                        <div>
                                            <h5>Đánh giá của bạn</h5>
                                        </div>
                                        <div className={"d-flex"}>
                                            {stars === 1 ? <div onClick={() => setStars(1)}>
                                                {Array.from({ length: 1 }, (_, index) => (
                                                    <i key={index} className="fa fa-star text-warning" style={{ color: '#CCCCCC' }}></i>
                                                ))}
                                            </div> : <div onClick={() => setStars(1)}>
                                                {Array.from({ length: 1 }, (_, index) => (
                                                    <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                                ))}
                                            </div>}
                                            <div style={{margin: "0 0.5rem"}}>|</div>
                                            {stars === 2 ? <div onClick={() => setStars(1)}>
                                                {Array.from({ length: 2 }, (_, index) => (
                                                    <i key={index} className="fa fa-star text-warning" style={{ color: '#CCCCCC' }}></i>
                                                ))}
                                            </div> : <div onClick={() => setStars(2)}>
                                                {Array.from({ length: 2 }, (_, index) => (
                                                    <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                                ))}
                                            </div>}
                                            <div style={{margin: "0 0.5rem"}}>|</div>
                                            {stars === 3 ? <div onClick={() => setStars(1)}>
                                                {Array.from({ length: 3 }, (_, index) => (
                                                    <i key={index} className="fa fa-star text-warning" style={{ color: '#CCCCCC' }}></i>
                                                ))}
                                            </div> : <div onClick={() => setStars(3)}>
                                                {Array.from({ length: 3 }, (_, index) => (
                                                    <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                                ))}
                                            </div>}
                                            <div style={{margin: "0 0.5rem"}}>|</div>
                                            {stars === 4 ? <div onClick={() => setStars(1)}>
                                                {Array.from({ length: 4 }, (_, index) => (
                                                    <i key={index} className="fa fa-star text-warning" style={{ color: '#CCCCCC' }}></i>
                                                ))}
                                            </div> : <div onClick={() => setStars(4)}>
                                                {Array.from({ length: 4 }, (_, index) => (
                                                    <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                                ))}
                                            </div>}
                                            <div style={{margin: "0 0.5rem"}}>|</div>
                                            {stars === 5 ?  <div onClick={() => setStars(1)}>
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <i key={index} className="fa fa-star text-warning" style={{ color: '#CCCCCC' }}></i>
                                                ))}
                                            </div> : <div onClick={() => setStars(5)}>
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                                ))}
                                            </div>}
                                        </div>
                                        <div className="col-inner has-border">
                                            {evaluateStatus !== 0 ? <Formik initialValues={{
                                                evaluate: "",
                                                email: "",
                                                fullName: ""
                                            }} onSubmit={handleSubmit1} validationSchema={handleSchema1}>
                                                <Form>
                                                    <div className="row mt-3">
                                                        <div className="col">
                                                            <Field as="textarea" className="form-control" style={{ height: "7rem", width: "100%", borderRadius: "0.25rem"}} placeholder="Đánh giá của bạn *" name="evaluate" />
                                                            <ErrorMessage name="evaluate" component='p' className="form-err" style={{ color: 'red', fontSize: "1rem",textAlign: "center"}} />
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col">
                                                            <Field type="text" placeholder="Email của bạn *"
                                                                   className="form-control" style={{width: "100%", borderRadius: "0.25rem"}}
                                                                   name="email"/>
                                                            <ErrorMessage name="email" component='p'
                                                                          className="form-err"
                                                                          style={{color: 'red', fontSize: "1rem",textAlign: "center"}}/>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col">
                                                            <Field type="text" placeholder="Họ và tên của bạn *"
                                                                   className="form-control" style={{width: "100%", borderRadius: "0.25rem"}}
                                                                   name="fullName"/>
                                                            <ErrorMessage name="fullName" component='p'
                                                                          className="form-err"
                                                                          style={{color: 'red', fontSize: "1rem",textAlign: "center"}}/>
                                                        </div>
                                                    </div>
                                                    <button type={"submit"}
                                                            className="btn btn-primary py-2 px-4"
                                                            style={{width: "100%", marginTop: "2rem"}}
                                                    >
                                                        Gửi đánh giá
                                                    </button>
                                                </Form>
                                            </Formik> : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Menu End */}
            {/* Footer Start */}
            <Footer/>
        </div>
    </>
}