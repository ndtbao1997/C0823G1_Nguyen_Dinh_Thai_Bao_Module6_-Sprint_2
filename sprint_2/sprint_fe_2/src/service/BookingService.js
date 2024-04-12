import  req  from "../http-common.js"
const setBooking = (param) => {
    return req.post(`/booking/set-booking`, param)
}
const handlePayment = (param) => {
    return req.get(`/payment/create-payment/${param}`)
}
const removeCookie = () => {
    return req.get(`/payment/remove-cookie`)
}
const removeBooking = (param) => {
    return req.get(`/booking/remove-booking/${param}`)
}
const handlePaymentByPoint = (param) => {
    return req.get(`/payment/payment-by-point/${param}`);
}
export const BookingService = {
    setBooking,
    handlePayment,
    removeCookie,
    removeBooking,
    handlePaymentByPoint
}