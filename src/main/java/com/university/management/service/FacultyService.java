package com.university.management.service;

import com.university.management.entity.Faculty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FacultyService {

    Faculty createFaculty(Faculty faculty);

    Faculty updateFaculty(Long id, Faculty faculty);

    void deleteFaculty(Long id);

    Page<Faculty> getAllFaculty(Pageable pageable);
}
