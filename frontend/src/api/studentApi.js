import api from "./axiosConfig";

export const getStudents = (page = 0, size = 5) =>
  api.get(`/api/admin/students?page=${page}&size=${size}`);

export const createStudent = (data) => api.post("/api/admin/students", data);

export const deleteStudent = (id) => api.delete(`/api/admin/students/${id}`);

export const updateStudent = (id, data) =>
  api.put(`/api/admin/students/${id}`, data);
