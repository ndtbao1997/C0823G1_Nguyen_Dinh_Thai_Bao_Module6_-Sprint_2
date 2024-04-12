package com.example.sprint_2_be.model;

import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    private String trademark;
    private String profile;
    private String infor;
    private String benefit;
    private String instruct;
    private String note;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted;
    @ManyToOne
    @JoinColumn(name = "product_type_id",referencedColumnName = "id")
    private ProductType productType;

    public Product(Long id, String productName, String trademark, String profile, String infor, String benefit, String instruct, String note, Boolean isDeleted, ProductType productType) {
        this.id = id;
        this.productName = productName;
        this.trademark = trademark;
        this.profile = profile;
        this.infor = infor;
        this.benefit = benefit;
        this.instruct = instruct;
        this.note = note;
        this.isDeleted = isDeleted;
        this.productType = productType;
    }

    public Product() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getTrademark() {
        return trademark;
    }

    public void setTrademark(String trademark) {
        this.trademark = trademark;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getInfor() {
        return infor;
    }

    public void setInfor(String infor) {
        this.infor = infor;
    }

    public String getBenefit() {
        return benefit;
    }

    public void setBenefit(String benefit) {
        this.benefit = benefit;
    }

    public String getInstruct() {
        return instruct;
    }

    public void setInstruct(String instruct) {
        this.instruct = instruct;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }
}
