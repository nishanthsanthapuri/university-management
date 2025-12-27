package com.university.management.service;

import com.university.management.entity.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EnrollmentService {

    Enrollment enrollStudent(Long studentId, Long courseId);

    void unenrollStudent(Long enrollmentId);

    Page<Enrollment> getAllEnrollments(Pageable pageable);
    List<Enrollment> getEnrollmentsByStudent(Long studentId);

}
