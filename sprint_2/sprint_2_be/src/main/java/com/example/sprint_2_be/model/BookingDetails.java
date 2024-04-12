package com.example.sprint_2_be.model;

import jakarta.persistence.*;

@Entity
@Table(name = "booking_details")
public class BookingDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "booking_id",referencedColumnName = "id")
    private Booking booking;
    @ManyToOne
    @JoinColumn(name = "product_detail_id",referencedColumnName = "id")
    private ProductDetails productDetails;
    private Long price;
    private Long quantity;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted;

    public BookingDetails(Long id, Booking booking, ProductDetails productDetails, Long price, Long quantity, Boolean isDeleted) {
        this.id = id;
        this.booking = booking;
        this.productDetails = productDetails;
        this.price = price;
        this.quantity = quantity;
        this.isDeleted = isDeleted;
    }

    public BookingDetails() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public ProductDetails getProductDetails() {
        return productDetails;
    }

    public void setProductDetails(ProductDetails productDetails) {
        this.productDetails = productDetails;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
