package com.university.management.controller;

import com.university.management.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public ApiResponse healthCheck() {
        return new ApiResponse(
                "University Management System is UP",
                true
        );
    }
}
