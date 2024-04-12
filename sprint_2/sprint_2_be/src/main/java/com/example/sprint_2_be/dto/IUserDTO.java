package com.example.sprint_2_be.dto;

public interface IUserDTO {
    Long getId();

    String getEmail();

    String getFullName();

    String getPassword();

    String getUserName();
    String getRole();
    String getProfile();
    Boolean getIsDeleted();
}
