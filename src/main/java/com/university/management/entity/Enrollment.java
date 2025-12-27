package com.university.management.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(
        name = "enrollments",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"student_id", "course_id"})
        }
)
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 Student ↔ Enrollment
    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private Student student;

    // 🔗 Course ↔ Enrollment
    @ManyToOne(optional = false)
    @JoinColumn(name = "course_id")
    private Course course;

    private LocalDate enrolledDate;

    // Constructors
    public Enrollment() {}

    public Enrollment(Student student, Course course, LocalDate enrolledDate) {
        this.student = student;
        this.course = course;
        this.enrolledDate = enrolledDate;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public LocalDate getEnrolledDate() {
        return enrolledDate;
    }

    public void setEnrolledDate(LocalDate enrolledDate) {
        this.enrolledDate = enrolledDate;
    }
}
