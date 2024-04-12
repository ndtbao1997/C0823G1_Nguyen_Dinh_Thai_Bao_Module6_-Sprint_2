package com.example.sprint_2_be.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;
    private String address;
    private String phoneNumber;
    private Boolean status;
    private String email;
    private String fullName;
    private LocalDateTime bookingDate;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted;

    public Booking(Long id, User user, String address, String phoneNumber, Boolean status, String email, String fullName, LocalDateTime bookingDate, Boolean isDeleted) {
        this.id = id;
        this.user = user;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.status = status;
        this.email = email;
        this.fullName = fullName;
        this.bookingDate = bookingDate;
        this.isDeleted = isDeleted;
    }

    public Booking() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
