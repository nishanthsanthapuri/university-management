import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../api/courseApi";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    code: "",
    name: "",
    credits: "",
  });

  const [editingId, setEditingId] = useState(null);

  const loadCourses = async (pageNo = 0) => {
    try {
      setLoading(true);
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
    loadCourses(0);
  }, []);

  const handleSubmit = async () => {
    try {
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
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete course?")) return;
    await deleteCourse(id);
    loadCourses(page);
  };

  return (
    <AppLayout>
      <h2>Courses</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <h3>Add / Update Course</h3>
      <div>
        <input
          placeholder="Course Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />

        <input
          placeholder="Course Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Credits"
          type="number"
          value={form.credits}
          onChange={(e) => setForm({ ...form, credits: e.target.value })}
        />

        <button onClick={handleSubmit}>{editingId ? "Update" : "Add"}</button>
      </div>
      <h3>Course List</h3>

      <table>
        <thead>
          <tr>
            <th style={th}>Code</th>
            <th style={th}>Name</th>
            <th style={th}>Credits</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td style={td}>{c.code}</td>
              <td style={td}>{c.name}</td>
              <td style={td}>{c.credits}</td>
              <td style={td}>
                <button
                  onClick={() => {
                    setForm(c);
                    setEditingId(c.id);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔢 Pagination */}
      <div>
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
const th = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

const td = {
  border: "1px solid #ddd",
  padding: "10px",
};

export default CoursesPage;
