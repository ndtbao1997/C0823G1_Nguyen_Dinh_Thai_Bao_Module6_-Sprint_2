package com.example.sprint_2_be.controller;

import com.example.sprint_2_be.dto.BookingDTO;
import com.example.sprint_2_be.dto.CartItemDTO;
import com.example.sprint_2_be.dto.IBookingDetailDTO;
import com.example.sprint_2_be.model.Booking;
import com.example.sprint_2_be.model.BookingDetails;
import com.example.sprint_2_be.model.ProductDetails;
import com.example.sprint_2_be.model.User;
import com.example.sprint_2_be.service.IBookingDetailsService;
import com.example.sprint_2_be.service.IBookingService;
import com.example.sprint_2_be.service.IProductDetailsService;
import com.example.sprint_2_be.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("Access-Control-Allow-Origin")
@RequestMapping("/api/booking")
public class BookingRestController {
    @Autowired
    private IBookingService iBookingService;
    @Autowired
    private IBookingDetailsService iBookingDetailsService;
    @Autowired
    private IProductDetailsService iProductDetailsService;
    @Autowired
    private IUserService iUserService;

    @PostMapping("/set-booking")
    @Transactional
    public ResponseEntity<?> setBooking(@RequestBody BookingDTO bookingDTO) {
        Booking booking = new Booking();
        if (bookingDTO.getUserId() != 0){
            Optional<User> user = iUserService.findById(bookingDTO.getUserId());
            user.ifPresent(booking::setUser);
        }
        booking.setAddress(bookingDTO.getAddress());
        booking.setEmail(bookingDTO.getEmail());
        booking.setBookingDate(LocalDateTime.now());
        booking.setFullName(bookingDTO.getFullName());
        booking.setPhoneNumber(bookingDTO.getPhoneNumber());
        booking.setStatus(true);
        Booking newBooking = iBookingService.save(booking);

        Optional<ProductDetails> productDetails;
        for (CartItemDTO item : bookingDTO.getListProduct()) {
            BookingDetails bookingDetails = new BookingDetails(); // Tạo mới đối tượng BookingDetails cho mỗi sản phẩm
            bookingDetails.setBooking(newBooking);
            bookingDetails.setPrice(item.getPrice());
            productDetails = iProductDetailsService.findById(item.getId());
            if (!productDetails.isPresent()) {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            if (productDetails.get().getQuantity() < item.getValue()) {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            bookingDetails.setProductDetails(productDetails.get());
            bookingDetails.setQuantity(item.getValue());
            iBookingDetailsService.save1(bookingDetails);
            productDetails.get().setQuantity(productDetails.get().getQuantity() - item.getValue());
            iProductDetailsService.save(productDetails.get());
        }
        return new ResponseEntity<>(newBooking.getId(), HttpStatus.OK);
    }

    @GetMapping("/remove-booking/{id}")
    public ResponseEntity<?> removeBooking(@PathVariable Long id){
        List<IBookingDetailDTO> iBookingDetailDTOS = iBookingDetailsService.findAllBookingDetailDTO(id);
        for (IBookingDetailDTO iBookingDetailDTO : iBookingDetailDTOS){
            Optional<ProductDetails> productDetails = iProductDetailsService.findById(iBookingDetailDTO.getProductDetailId());
            if (productDetails.isPresent()){
                productDetails.get().setQuantity(productDetails.get().getQuantity() + iBookingDetailDTO.getQuantity());
                iProductDetailsService.save1(productDetails.get());
            }
        }
        iBookingDetailsService.deleteAllByBookingId(id);
        iBookingService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
