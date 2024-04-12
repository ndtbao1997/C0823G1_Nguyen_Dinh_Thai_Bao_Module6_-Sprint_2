package com.example.sprint_2_be.dto;

public class UserClientDTO {
    private Long id;
    private String fullName;
    private String role;
    private String profile;
    private String userName;
    private String email;
    Boolean isDeleted;

    public UserClientDTO(Long id, String fullName, String role, String profile, String userName, String email, Boolean isDeleted) {
        this.id = id;
        this.fullName = fullName;
        this.role = role;
        this.profile = profile;
        this.userName = userName;
        this.email = email;
        this.isDeleted = isDeleted;
    }

    public UserClientDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }
}
