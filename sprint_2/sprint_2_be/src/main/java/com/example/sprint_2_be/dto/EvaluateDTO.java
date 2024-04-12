package com.example.sprint_2_be.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public class EvaluateDTO {
    private Long productId;

    @NotBlank
    @Length(min = 1, max = 1000)
    private String content;
    @Email
    private String email;
    @NotBlank
    @Length(min = 5, max = 50)
    @Pattern(regexp = "^[\\p{L} ]+$")
    private String fullName;
    @NotNull
    private Integer stars;

    public EvaluateDTO(Long productId, String content, String email, String fullName, Integer stars) {
        this.productId = productId;
        this.content = content;
        this.email = email;
        this.fullName = fullName;
        this.stars = stars;
    }

    public EvaluateDTO() {
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }
}
