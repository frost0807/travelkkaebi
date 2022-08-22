package com.bitcamp.travelkkaebi.exception;

public class KkaebiException extends RuntimeException {
    ErrorCode errorCode;
    public KkaebiException(ErrorCode errorCode) {
        super(errorCode.message);
        this.errorCode = errorCode;
    }

    public KkaebiException(String message) {
        super(message);
    }
}
