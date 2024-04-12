package com.example.sprint_2_be.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String password;
    private String email;
    private String profile;
    private String fullName;

    @Column(columnDefinition = "BIGINT default 0")
    private Long point;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted;

    public User(Long id, String userName, String password, String email, String profile, String fullName, Long point, Boolean isDeleted) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.profile = profile;
        this.fullName = fullName;
        this.point = point;
        this.isDeleted = isDeleted;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Long getPoint() {
        return point;
    }

    public void setPoint(Long point) {
        this.point = point;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
