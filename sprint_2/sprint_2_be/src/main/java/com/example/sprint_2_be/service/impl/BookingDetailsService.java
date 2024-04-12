package com.example.sprint_2_be.service.impl;

import com.example.sprint_2_be.dto.IBookingDetailDTO;
import com.example.sprint_2_be.model.Booking;
import com.example.sprint_2_be.model.BookingDetails;
import com.example.sprint_2_be.repository.IBookingDetailsRepository;
import com.example.sprint_2_be.service.IBookingDetailsService;
import com.example.sprint_2_be.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class BookingDetailsService implements IBookingDetailsService {
    @Autowired
    private IBookingDetailsRepository iBookingDetailsRepository;


    @Override
    public Optional<BookingDetails> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Iterator<BookingDetails> findAll() {
        return null;
    }

    @Override
    public BookingDetails save(BookingDetails bookingDetails) {
        return iBookingDetailsRepository.save(bookingDetails);

    }

    @Override
    public void save1(BookingDetails bookingDetails) {
        iBookingDetailsRepository.save(bookingDetails);
    }

    @Override
    public void deleteById(Long id) {

    }


    @Override
    public List<IBookingDetailDTO> findAllBookingDetailDTO(Long id) {
        return iBookingDetailsRepository.findAllBookingDetailDTO(id);
    }

    @Override
    public void deleteAllByBookingId(Long idBooking) {
        iBookingDetailsRepository.deleteAllByBookingId(idBooking);
    }
}
