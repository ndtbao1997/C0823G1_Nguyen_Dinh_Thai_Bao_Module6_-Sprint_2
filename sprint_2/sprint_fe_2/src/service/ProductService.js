import req from "../http-common.js"
const findAllProductType = () => {
    return req.get(`/product/find-all`);
}
const findAllProductDetailsLowestPrice = (param, currentPage) => {
    return req.get(`/product/find-all-product-details-lowest-price/${param}?page=${currentPage}`);
}
const findAllByProductId = (id) => {
    return req.get(`/product/find-all-by-product-id/${id}`);
}
const findById = (id) => {
    return req.get(`/product/find-by-id/${id}`)
}

const findAllProductFromCart = (param) => {
    return req.post(`/product/find-all-product-from-cart`, param);
}
export const ProductService = {
    findAllProductType,
    findAllProductDetailsLowestPrice,
    findAllByProductId,
    findById,
    findAllProductFromCart
}