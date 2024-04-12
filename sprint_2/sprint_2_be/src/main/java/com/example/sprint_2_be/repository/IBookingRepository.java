package com.example.sprint_2_be.repository;

import com.example.sprint_2_be.model.Booking;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IBookingRepository extends JpaRepository<Booking,Long> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE booking SET status = false WHERE id = :idBooking", nativeQuery = true)
    void updateStatus(@Param("idBooking") Long idBooking);
}
