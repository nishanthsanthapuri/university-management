package com.university.management.service.impl;

import com.university.management.entity.Faculty;
import com.university.management.repository.FacultyRepository;
import com.university.management.service.FacultyService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FacultyServiceImpl implements FacultyService {

    private final FacultyRepository facultyRepository;

    public FacultyServiceImpl(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    @Override
    public Faculty createFaculty(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    @Override
    public Faculty updateFaculty(Long id, Faculty faculty) {
        Faculty existing = facultyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        existing.setName(faculty.getName());
        existing.setEmail(faculty.getEmail());
        existing.setDepartment(faculty.getDepartment());

        return facultyRepository.save(existing);
    }

    @Override
    public void deleteFaculty(Long id) {
        facultyRepository.deleteById(id);
    }

    @Override
    public Page<Faculty> getAllFaculty(Pageable pageable) {
        return facultyRepository.findAll(pageable);
    }
}
