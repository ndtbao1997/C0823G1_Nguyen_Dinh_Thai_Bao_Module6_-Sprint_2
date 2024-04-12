package com.example.sprint_2_be.service;

import com.example.sprint_2_be.model.Booking;

public interface IBookingService extends IGeneratedService<Booking>{
    void updateStatus(Long idBooking);

    void senMail(Long idBooking);
}
