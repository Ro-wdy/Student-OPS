import { useEffect, useState } from "react";

const API = "/api/students/";
const empty = { name: "", email: "", age: "", course: "" };

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch(API);
    setStudents(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `${API}${editingId}/` : API;
    const res = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }
    setForm(empty);
    setEditingId(null);
    setError("");
    load();
  };

  const handleEdit = (s) => {
    setEditingId(s.id);
    setForm({ name: s.name, email: s.email, age: s.age, course: s.course });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    await fetch(`${API}${id}/`, { method: "DELETE" });
    load();
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Student Records</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update Student" : "Add Student"}</button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm(empty); }}>
            Cancel
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: 24 }}>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Age</th><th>Course</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.age}</td>
              <td>{s.course}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>{" "}
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}