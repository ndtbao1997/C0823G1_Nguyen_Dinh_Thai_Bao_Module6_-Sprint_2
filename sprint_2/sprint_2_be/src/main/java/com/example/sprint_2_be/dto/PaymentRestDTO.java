package com.example.sprint_2_be.dto;

public class PaymentRestDTO {
    private String status;
    private String message;
    private String URL;

    public PaymentRestDTO(String status, String message, String URL) {
        this.status = status;
        this.message = message;
        this.URL = URL;
    }

    public PaymentRestDTO() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }
}
