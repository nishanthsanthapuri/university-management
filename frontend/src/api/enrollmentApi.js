import api from "./axiosConfig";

export const enrollStudent = (studentId, courseId) =>
  api.post(
    `/api/admin/enrollments?studentId=${studentId}&courseId=${courseId}`
  );

export const getEnrollmentsByStudent = (studentId) =>
  api.get(`/api/admin/enrollments/by-student/${studentId}`);

export const unenrollStudent = (id) =>
  api.delete(`/api/admin/enrollments/${id}`);
