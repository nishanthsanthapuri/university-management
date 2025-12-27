package com.university.management.service;

import com.university.management.entity.Student;
import com.university.management.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;


//import java.awt.print.Pageable;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public Student create(Student student) {
        return repository.save(student);
    }


    public Page<Student> getAll(int page, int size) {
        Pageable pageable = (Pageable) PageRequest.of(page, size);
        return repository.findAll((org.springframework.data.domain.Pageable) pageable);
    }


    public Student update(Long id, Student updated) {
        Student student = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setName(updated.getName());
        student.setEmail(updated.getEmail());
        student.setDepartment(updated.getDepartment());
        student.setYear(updated.getYear());

        return repository.save(student);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
