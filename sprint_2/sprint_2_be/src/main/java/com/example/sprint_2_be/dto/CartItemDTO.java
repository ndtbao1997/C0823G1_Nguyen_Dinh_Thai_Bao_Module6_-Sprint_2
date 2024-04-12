package com.example.sprint_2_be.dto;

public class CartItemDTO {
    private Long id;
    private Long value;
    private Long price;

    public CartItemDTO(Long id, Long value, Long price) {
        this.id = id;
        this.value = value;
        this.price = price;
    }

    public CartItemDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }
}
