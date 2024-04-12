package com.example.sprint_2_be.dto;

import java.time.LocalDateTime;

public interface IEvaluateDTO {
    Long getId();
    String getContent();
    Long getProductId();
    String getEmail();
    String getFullName();
    Integer getStars();
    LocalDateTime getEvaluateDate();
}
