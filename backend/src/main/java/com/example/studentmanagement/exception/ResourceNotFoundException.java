package com.example.studentmanagement.exception;

/**
 * Custom exception thrown when a requested student resource is not found.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
