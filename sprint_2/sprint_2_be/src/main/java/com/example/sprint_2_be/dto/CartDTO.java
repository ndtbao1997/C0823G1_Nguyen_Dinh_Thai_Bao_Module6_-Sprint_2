package com.example.sprint_2_be.dto;

public class CartDTO {
    private Long[] productId;

    public CartDTO(Long[] productId) {
        this.productId = productId;
    }

    public CartDTO() {
    }

    public Long[] getProductId() {
        return productId;
    }

    public void setProductId(Long[] productId) {
        this.productId = productId;
    }
}
