import { useEffect, useState } from "react";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../api/courseApi";
import AppLayout from "../components/AppLayout";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ code: "", name: "", credits: "" });
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCourses = async (pageNo = 0) => {
    try {
      setLoading(true);
      setError("");
      const res = await getCourses(pageNo, 5);
      setCourses(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(pageNo);
    } catch {
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (editingId) {
        await updateCourse(editingId, form);
      } else {
        await createCourse(form);
      }

      setForm({ code: "", name: "", credits: "" });
      setEditingId(null);
      loadCourses(page);
    } catch {
      setError("Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (c) => {
    setForm(c);
    setEditingId(c.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      setLoading(true);
      await deleteCourse(id);
      loadCourses(page);
    } catch {
      setError("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <h3>Course Management</h3>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <div className="form-group">
        <input
          placeholder="Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Credits"
          type="number"
          value={form.credits}
          onChange={(e) => setForm({ ...form, credits: e.target.value })}
        />
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {editingId ? "Update Course" : "Add Course"}
      </button>

      {loading && <p>Loading...</p>}

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.credits}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button
                  style={{ marginLeft: "6px", background: "#e53935" }}
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 0} onClick={() => loadCourses(page - 1)}>
          Prev
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => loadCourses(page + 1)}
        >
          Next
        </button>
      </div>
    </AppLayout>
  );
}

export default CourseManagement;
