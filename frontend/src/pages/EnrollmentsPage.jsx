import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { getStudents } from "../api/studentApi";
import { getCourses } from "../api/courseApi";
import {
  enrollStudent,
  getEnrollmentsByStudent,
  unenrollStudent,
} from "../api/enrollmentApi";

function EnrollmentsPage() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState("");

  const loadCourses = async () => {
    const res = await getCourses(0, 100);
    setCourses(res.data.content);
  };

  const loadStudents = async () => {
    const res = await getStudents(0, 100);
    setStudents(res.data.content);
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([loadStudents(), loadCourses()]);
    };
    loadData();
  }, []);

  const loadEnrollments = async (studentId) => {
    if (!studentId) return;
    const res = await getEnrollmentsByStudent(studentId);
    setEnrollments(res.data);
  };

  const handleEnroll = async () => {
    if (!selectedStudent || !selectedCourse) {
      setError("Select student and course");
      return;
    }
    await enrollStudent(selectedStudent, selectedCourse);
    loadEnrollments(selectedStudent);
    setError("");
  };

  const handleUnenroll = async (id) => {
    await unenrollStudent(id);
    loadEnrollments(selectedStudent);
  };

  return (
    <AppLayout>
      <h2>Enrollments</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "20px" }}>
        <select
          value={selectedStudent}
          onChange={(e) => {
            setSelectedStudent(e.target.value);
            loadEnrollments(e.target.value);
          }}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code}
            </option>
          ))}
        </select>

        <button
          onClick={handleEnroll}
          disabled={!selectedStudent || !selectedCourse}
          style={{
            padding: "8px 14px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Enroll
        </button>
      </div>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th style={th}>Student Name</th>
            <th style={th}>Course Code</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {enrollments.length === 0 ? (
            <tr>
              <td style={td} colSpan="3">
                No enrollments found
              </td>
            </tr>
          ) : (
            enrollments.map((e) => (
              <tr key={e.id}>
                <td style={td}>{e.student.name}</td>
                <td style={td}>{e.course.code}</td>
                <td style={td}>
                  <button
                    style={{
                      background: "#e53935",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleUnenroll(e.id)}
                  >
                    ❌ Unenroll
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AppLayout>
  );
}

const th = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f5f5f5",
};

const td = {
  border: "1px solid #ddd",
  padding: "10px",
};

export default EnrollmentsPage;
