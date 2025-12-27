package com.university.management.controller;

import com.university.management.entity.Enrollment;
import com.university.management.service.EnrollmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/enrollments")
@PreAuthorize("hasRole('ADMIN')")

public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    // 🎓 Enroll student into course
    @PostMapping
    public Enrollment enrollStudent(
            @RequestParam Long studentId,
            @RequestParam Long courseId
    ) {
        return enrollmentService.enrollStudent(studentId, courseId);
    }

    // ❌ Unenroll student
    @DeleteMapping("/{id}")
    public void unenrollStudent(@PathVariable Long id) {
        enrollmentService.unenrollStudent(id);
    }

    // 📄 View all enrollments (paged)
    @GetMapping
    public Page<Enrollment> getAllEnrollments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return enrollmentService.getAllEnrollments(
                PageRequest.of(page, size)
        );
    }
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNotFound(RuntimeException ex) {
        return ex.getMessage();
    }
    @GetMapping("/by-student/{studentId}")
    public List<Enrollment> getByStudent(@PathVariable Long studentId) {
        return enrollmentService.getEnrollmentsByStudent(studentId);
    }


}

