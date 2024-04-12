package com.example.sprint_2_be.repository;

import com.example.sprint_2_be.dto.IBookingDetailDTO;
import com.example.sprint_2_be.model.BookingDetails;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookingDetailsRepository extends JpaRepository<BookingDetails,Long> {
    @Query(value = "select booking_details.booking_id as bookingId,\n" +
            "booking_details.product_detail_id as productDetailId,\n" +
            "booking_details.quantity as quantity,\n" +
            "booking_details.price as price,\n" +
            "booking_details.is_deleted as isDeleted,\n" +
            "booking.address as address,\n" +
            "booking.phone_number as phoneNumber,\n" +
            "booking.user_id as userId,\n" +
            "booking.email as email,\n" +
            "booking.full_name as fullName,\n" +
            "product.product_name as productName,\n" +
            "product_details.weight as weight,\n" +
            "booking.status as status from booking_details \n" +
            "join booking on booking_details.booking_id = booking.id\n" +
            "join product_details on booking_details.product_detail_id = product_details.id\n" +
            "join product on product.id = product_details.product_id\n" +
            "where booking.id = :id", nativeQuery = true)
    List<IBookingDetailDTO> findAllBookingDetailDTO(@Param("id") Long id);
    @Transactional
    @Modifying
    @Query(value = "DELETE from booking_details where booking_id = :idBooking", nativeQuery = true)
    void deleteAllByBookingId(Long idBooking);
}
