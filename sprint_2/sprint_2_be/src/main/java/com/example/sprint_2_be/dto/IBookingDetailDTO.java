package com.example.sprint_2_be.dto;

public interface IBookingDetailDTO {
    Long getBookingId();
    Long getProductDetailId();
    Long getQuantity();
    Long getPrice();
    Boolean getIsDeleted();
    String getAddress();
    String getPhoneNumber();
    Long getUserId();
    String getEmail();
    String getFullName();
    Boolean getStatus();
    String getProductName();
    Double getWeight();
}
