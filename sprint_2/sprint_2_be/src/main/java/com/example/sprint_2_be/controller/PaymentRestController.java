package com.example.sprint_2_be.controller;

import com.example.sprint_2_be.config.VNPayConfig;
import com.example.sprint_2_be.dto.IBookingDetailDTO;
import com.example.sprint_2_be.dto.PaymentRestDTO;
import com.example.sprint_2_be.model.Booking;
import com.example.sprint_2_be.model.BookingDetails;
import com.example.sprint_2_be.model.ProductDetails;
import com.example.sprint_2_be.model.User;
import com.example.sprint_2_be.service.IBookingDetailsService;
import com.example.sprint_2_be.service.IBookingService;
import com.example.sprint_2_be.service.IProductDetailsService;
import com.example.sprint_2_be.service.IUserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin("Access-Control-Allow-Origin")
@RequestMapping("/api/payment")
public class PaymentRestController {
    @Autowired
    private IBookingDetailsService iBookingDetailsService;
    @Autowired
    private IBookingService iBookingService;
    @Autowired
    private IProductDetailsService iProductDetailsService;
    @Autowired
    private IUserService iUserService;

    @GetMapping("/create-payment/{id}")
    public ResponseEntity<?> createPayment(HttpServletRequest req, @PathVariable Long id) throws UnsupportedEncodingException {
        Long totalPrice = 0L;
        List<IBookingDetailDTO> bookingDetailDTOList = iBookingDetailsService.findAllBookingDetailDTO(id);
        for (IBookingDetailDTO iBookingDetailDTO : bookingDetailDTOList) {
            totalPrice += iBookingDetailDTO.getPrice() * iBookingDetailDTO.getQuantity();
        }
        totalPrice = totalPrice * 100;
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";

        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
//        String bankCode = "NCB";
        String vnp_IpAddr = VNPayConfig.getIpAddress(req);

        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(totalPrice));
        vnp_Params.put("vnp_CurrCode", "VND");
//        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + bookingDetailDTOList.get(0).getBookingId());
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 5);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
        PaymentRestDTO paymentRestDTO = new PaymentRestDTO();
        paymentRestDTO.setStatus("OK");
        paymentRestDTO.setMessage("Successfully");
        paymentRestDTO.setURL(paymentUrl);

        return new ResponseEntity<>(paymentRestDTO, HttpStatus.OK);
    }

    @GetMapping("/checkout_result")
    public RedirectView transaction(@RequestParam(value = "vnp_Amount") String vnpAmount,
                                    @RequestParam(value = "vnp_BankCode") String vnpBankcode,
                                    @RequestParam(value = "vnp_OrderInfo") String vnpOrderInfor,
                                    @RequestParam(value = "vnp_ResponseCode") String vnpResponeCode,
                                    HttpServletResponse response) {
        RedirectView redirectView = new RedirectView();
        if (vnpResponeCode.equals("00")) {
            String[] strings = vnpOrderInfor.split(":");
            Long idBooking = Long.parseLong(strings[1]);
            Optional<Booking> booking = iBookingService.findById(idBooking);
            if (booking.isPresent()){
                if (booking.get().getUser() != null){
                    Optional<User> user = iUserService.findById(booking.get().getUser().getId());
                    if (user.isPresent()){
                        List<IBookingDetailDTO> bookingDetailsDTOS = iBookingDetailsService.findAllBookingDetailDTO(idBooking);
                        Long point = 0L;
                        for (IBookingDetailDTO iBookingDetailDTO:bookingDetailsDTOS){
                            point += iBookingDetailDTO.getPrice() * iBookingDetailDTO.getQuantity();
                        }
                        user.get().setPoint(user.get().getPoint() + (point/100*3));
                        iUserService.save(user.get());
                    }
                }
            }
            iBookingService.senMail(idBooking);
            System.out.println(vnpOrderInfor);
            iBookingService.updateStatus(idBooking);
            Cookie cookie = new Cookie("bookingStatus", "Ok");
            cookie.setMaxAge(60 * 2);
            cookie.setPath("/");
            response.addCookie(cookie);

        } else {
            String[] strings = vnpOrderInfor.split(":");
            Long idBooking = Long.parseLong(strings[1]);
            List<IBookingDetailDTO> iBookingDetailDTOS = iBookingDetailsService.findAllBookingDetailDTO(idBooking);
            for (IBookingDetailDTO iBookingDetailDTO : iBookingDetailDTOS){
                Optional<ProductDetails> productDetails = iProductDetailsService.findById(iBookingDetailDTO.getProductDetailId());
                if (productDetails.isPresent()){
                    productDetails.get().setQuantity(productDetails.get().getQuantity() + iBookingDetailDTO.getQuantity());
                    iProductDetailsService.save1(productDetails.get());
                }
            }
            iBookingDetailsService.deleteAllByBookingId(idBooking);
            iBookingService.deleteById(idBooking);
            Cookie cookie = new Cookie("bookingStatus", "Fail");
            cookie.setMaxAge(60 * 2);
            cookie.setPath("/");
            response.addCookie(cookie);
        }
        redirectView.setUrl("http://localhost:3000/");
        return redirectView;
    }

    @GetMapping("/remove-cookie")
    public ResponseEntity<?> removeCookie(HttpServletResponse response){
        Cookie cookie = new Cookie("bookingStatus", "");
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/payment-by-point/{id}")
    public ResponseEntity<?> paymentByPoint(@PathVariable Long id, HttpServletResponse response){
        Long totalPrice = 0L;
        List<IBookingDetailDTO> bookingDetailDTOList = iBookingDetailsService.findAllBookingDetailDTO(id);
        for (IBookingDetailDTO iBookingDetailDTO : bookingDetailDTOList) {
            totalPrice += iBookingDetailDTO.getPrice() * iBookingDetailDTO.getQuantity();
        }
        Optional<User> user = iUserService.findById(bookingDetailDTOList.get(0).getUserId());
        if (!user.isPresent()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (user.get().getPoint() < totalPrice){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        user.get().setPoint(user.get().getPoint()-totalPrice);
        Optional<Booking> booking = iBookingService.findById(id);
        booking.get().setDeleted(true);
        iUserService.save(user.get());
        iBookingService.save(booking.get());
        Cookie cookie = new Cookie("bookingStatus", "Ok");
        cookie.setMaxAge(60 * 2);
        cookie.setPath("/");
        response.addCookie(cookie);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
