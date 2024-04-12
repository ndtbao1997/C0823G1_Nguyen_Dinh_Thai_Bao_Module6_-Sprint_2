package com.example.sprint_2_be.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "evaluate")
public class Evaluate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product product;
    private String content;

    private String email;
    private String fullName;

    private Integer stars;

    private LocalDateTime evaluateDate;

    public Evaluate() {
    }

    public Evaluate(Long id, Product product, String content, String email, String fullName, Integer stars, LocalDateTime evaluateDate) {
        this.id = id;
        this.product = product;
        this.content = content;
        this.email = email;
        this.fullName = fullName;
        this.stars = stars;
        this.evaluateDate = evaluateDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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

    public LocalDateTime getEvaluateDate() {
        return evaluateDate;
    }

    public void setEvaluateDate(LocalDateTime evaluateDate) {
        this.evaluateDate = evaluateDate;
    }
}
