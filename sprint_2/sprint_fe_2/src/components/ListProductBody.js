import {Header} from "./Header";
import {faCat, faDog, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {ProductService} from "../service/ProductService";
import ReactPaginate from "react-paginate";
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {useNavigate, useParams} from "react-router-dom";
import {useCart} from "./CartContext";
import {Footer} from "./Footer";

export function ListProductBody() {
    const [listProduct, setListProduct] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [productType, setProductType] = useState(1);
    const {id} = useParams();
    const navigate = useNavigate();
    const {addToCart} = useCart();

    const handleAddToCart = async (id) => {
        await addToCart(id);
    };
    const fetchData = async () => {
        try {
            setProductType(parseInt(id));
            let res1 = await ProductService.findAllProductDetailsLowestPrice(parseInt(id), currentPage);
            setListProduct(res1.data.content);
            setTotalPage(res1.data.totalPages);
            setCurrentPage(res1.data.number);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, [id])
    const handlePageClick = async (e) => {
        const page = e.selected;
        try {
            console.log(productType);
            const res1 = await ProductService.findAllProductDetailsLowestPrice(productType, page);
            setListProduct(res1.data.content);
            setTotalPage(res1.data.totalPages);
            setCurrentPage(res1.data.number);
            console.log(
                res1
            )
        } catch (err) {
            console.log(err);
        }
    }
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    const handleFood = async (id) => {
        try {
            setProductType(id);
            const res = await ProductService.findAllProductType();
            let res1 = await ProductService.findAllProductDetailsLowestPrice(parseInt(id), 0);
            setListProduct(res1.data.content);
            setTotalPage(res1.data.totalPages);
            setCurrentPage(res1.data.number);
        } catch (err) {
            console.log(err);
        }
    }
    const handleDetail = (id) => {
        navigate(`/product-detail/${id}`)
    }

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
                            Danh sách hạt
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
                                    Hạt
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
                            Danh sách hạt
                        </h5>
                        <h1 className="mb-5">Lựa chọn loại hạt</h1>
                    </div>
                    <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.1s">
                        <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                            <li className="nav-item">
                                {productType === 1 ? <a
                                    className="d-flex align-items-center text-start mx-0 ms-0 pb-3 active"
                                    data-bs-toggle="pill"
                                    href="#tab-1" onClick={() => handleFood(1)}
                                >
                                    <FontAwesomeIcon icon={faDog} className="fa fa-coffee fa-2x text-primary"/>
                                    <div className="ps-3">
                                        <small className="text-body">Loại</small>
                                        <h6 className="mt-n1 mb-0">Hạt cho chó</h6>
                                    </div>
                                </a> : <a
                                    className="d-flex align-items-center text-start mx-3 ms-0 pb-3"
                                    data-bs-toggle="pill"
                                    href="#tab-1" onClick={() => handleFood(1)}
                                >
                                    <FontAwesomeIcon icon={faDog} className="fa fa-coffee fa-2x text-primary"/>
                                    <div className="ps-3">
                                        <small className="text-body">Loại</small>
                                        <h6 className="mt-n1 mb-0">Hạt cho chó</h6>
                                    </div>
                                </a>}
                            </li>
                            <li className="nav-item">
                                {productType === 2 ? <a
                                        className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                                        data-bs-toggle="pill"
                                        href="#tab-2" onClick={() => handleFood(2)}
                                    >
                                        <FontAwesomeIcon icon={faCat} className="fa fa-coffee fa-2x text-primary"/>
                                        <div className="ps-3">
                                            <small className="text-body">Loại</small>
                                            <h6 className="mt-n1 mb-0">Hạt cho mèo</h6>
                                        </div>
                                    </a> :
                                    <a
                                        className="d-flex align-items-center text-start mx-3 pb-3"
                                        data-bs-toggle="pill"
                                        href="#tab-2" onClick={() => handleFood(2)}
                                    >
                                        <FontAwesomeIcon icon={faCat} className="fa fa-coffee fa-2x text-primary"/>
                                        <div className="ps-3">
                                            <small className="text-body">Loại</small>
                                            <h6 className="mt-n1 mb-0">Hạt cho mèo</h6>
                                        </div>
                                    </a>}
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    {listProduct.map(product => (
                                        <div className="col-lg-6" style={{marginTop: "5rem"}} key={product.id}>
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
                                                        {product.avgStars === null ?    <div>
                                                            {Array.from({length: 5}, (_, index) => (
                                                                <i key={index}
                                                                   className="fa fa-star text-warning me-1"></i>
                                                            ))}
                                                        </div> : ""}
                                                        {product.avgStars !== null && product.avgStars < 1.5 ?    <div>
                                                            {Array.from({length: 1}, (_, index) => (
                                                                <i key={index}
                                                                   className="fa fa-star text-warning me-1"></i>
                                                            ))}
                                                            {Array.from({ length: 4 }, (_, index) => (
                                                                <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                                            ))}
                                                        </div> : ""}
                                                        {product.avgStars >= 1.5 && product.avgStars < 2.5 ?    <div>
                                                            {Array.from({length: 2}, (_, index) => (
                                                                <i key={index}
                                                                   className="fa fa-star text-warning me-1"></i>
                                                            ))}
                                                            {Array.from({ length: 3 }, (_, index) => (
                                                                <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                                            ))}
                                                        </div> : ""}
                                                        {product.avgStars >= 2.5 && product.avgStars < 3.5 ?    <div>
                                                            {Array.from({length: 3}, (_, index) => (
                                                                <i key={index}
                                                                   className="fa fa-star text-warning me-1"></i>
                                                            ))}
                                                            {Array.from({ length: 2 }, (_, index) => (
                                                                <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                                            ))}
                                                        </div> : ""}
                                                        {product.avgStars >= 3.5 && product.avgStars < 4.5 ?    <div>
                                                            {Array.from({length: 4}, (_, index) => (
                                                                <i key={index}
                                                                   className="fa fa-star text-warning me-1"></i>
                                                            ))}
                                                            {Array.from({ length: 1 }, (_, index) => (
                                                                <i key={index} className="fa fa-star" style={{ color: '#CCCCCC' }}></i>
                                                            ))}
                                                        </div> : ""}
                                                        {product.avgStars >= 4.5 ?    <div>
                                                            {Array.from({length: 5}, (_, index) => (
                                                                <i key={index}
                                                                   className="fa fa-star text-warning me-1"></i>
                                                            ))}
                                                        </div> : ""}
                                                        <button onClick={() => handleAddToCart(product.id)}
                                                                className="btn btn-primary ms-auto me-2">
                                                            <FontAwesomeIcon icon={faCartPlus}/>
                                                        </button>
                                                        <button className="btn btn-secondary"
                                                                onClick={() => handleDetail(product.productId)}>
                                                            <FontAwesomeIcon icon={faInfoCircle}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {listProduct.length !== 0 ? (
                                        <div className="clearfix" style={{marginTop: "5rem"}}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }} className="page">
                                                <ReactPaginate
                                                    forcePage={currentPage}
                                                    breakLabel="..."
                                                    nextLabel="Trang Sau"
                                                    onPageChange={handlePageClick}
                                                    pageRangeDisplayed={2}
                                                    marginPagesDisplayed={2}
                                                    pageCount={totalPage}
                                                    previousLabel="Trang Trước"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </div>
                                        </div>
                                    ) : <div></div>}
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