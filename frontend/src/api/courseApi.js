import api from "./axiosConfig";

/**
 * GET paginated courses
 */
export const getCourses = (page = 0, size = 5) =>
  api.get("/api/admin/courses", {
    params: { page, size },
  });

/**
 * CREATE course
 */
export const createCourse = (data) =>
  api.post("/api/admin/courses", {
    code: data.code,
    name: data.name,
    credits: Number(data.credits),
  });

/**
 * UPDATE course
 */
export const updateCourse = (id, data) =>
  api.put(`/api/admin/courses/${id}`, {
    code: data.code,
    name: data.name,
    credits: Number(data.credits),
  });

/**
 * DELETE course
 */
export const deleteCourse = (id) => api.delete(`/api/admin/courses/${id}`);
