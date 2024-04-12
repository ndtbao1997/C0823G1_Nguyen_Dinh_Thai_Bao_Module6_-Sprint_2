package com.example.sprint_2_be.service;

import com.example.sprint_2_be.dto.IBookingDetailDTO;
import com.example.sprint_2_be.model.BookingDetails;

import java.util.List;

public interface IBookingDetailsService extends IGeneratedService<BookingDetails> {
    List<IBookingDetailDTO> findAllBookingDetailDTO(Long id);

    void deleteAllByBookingId(Long idBooking);
}
