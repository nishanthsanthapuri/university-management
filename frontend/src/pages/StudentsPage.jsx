import { useEffect, useState } from "react";
import {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../api/studentApi";
import AppLayout from "../components/AppLayout";

const th = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

const td = {
  border: "1px solid #ddd",
  padding: "10px",
};

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
  });

  const [editingId, setEditingId] = useState(null);

  const loadStudents = async (pageNo = 0) => {
    try {
      setLoading(true);
      const res = await getStudents(pageNo, 5);
      setStudents(res.data.content);
      setTotalPages(res.data.totalPages);
      setPage(pageNo);
    } catch {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents(0);
  }, []);

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateStudent(editingId, form);
      } else {
        await createStudent(form);
      }
      setForm({ name: "", email: "", department: "", year: Number(form.year) });
      setEditingId(null);
      loadStudents(page);
    } catch {
      setError("Failed to save student");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete student?")) return;
    await deleteStudent(id);
    loadStudents(page);
  };

  return (
    <AppLayout>
      <h2>Students</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Add / Update Student</h3>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Department"
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />
      <input
        placeholder="Year"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
      />
      <button onClick={handleSubmit}>{editingId ? "Update" : "Add"}</button>

      <h3>Student List</h3>
      {loading && <p>Loading...</p>}

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Department</th>
            <th style={th}>Year</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "12px" }}>
                No students found
              </td>
            </tr>
          )}

          {students.map((s) => (
            <tr key={s.id}>
              <td style={td}>{s.name}</td>
              <td style={td}>{s.email}</td>
              <td style={td}>{s.department}</td>
              <td style={td}>{s.year}</td>
              <td style={td}>
                <button
                  style={{ marginRight: "8px" }}
                  onClick={() => {
                    setForm({
                      name: s.name,
                      email: s.email,
                      department: s.department,
                      year: s.year,
                    });
                    setEditingId(s.id);
                  }}
                >
                  ✏ Edit
                </button>

                <button
                  style={{ background: "#e53935", color: "white" }}
                  onClick={() => handleDelete(s.id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button disabled={page === 0} onClick={() => loadStudents(page - 1)}>
        Prev
      </button>
      <span>
        Page {page + 1} of {totalPages}
      </span>
      <button
        disabled={page + 1 >= totalPages}
        onClick={() => loadStudents(page + 1)}
      >
        Next
      </button>
    </AppLayout>
  );
}

export default StudentsPage;
