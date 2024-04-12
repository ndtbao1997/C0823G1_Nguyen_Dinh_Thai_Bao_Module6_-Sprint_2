package com.example.sprint_2_be.dto;

public class BookingDTO {
    private String email;
    private String fullName;
    private String phoneNumber;
    private String address;
    private Long userId;
    private CartItemDTO[] listProduct;

    public BookingDTO(String email, String fullName, String phoneNumber, String address, Long userId, CartItemDTO[] listProduct) {
        this.email = email;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.userId = userId;
        this.listProduct = listProduct;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BookingDTO() {
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public CartItemDTO[] getListProduct() {
        return listProduct;
    }

    public void setListProduct(CartItemDTO[] listProduct) {
        this.listProduct = listProduct;
    }
}
