package com.example.hearouropinion.Entities;

public class ResponseError {
    private final int status;
    private final String message;

    public ResponseError(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
