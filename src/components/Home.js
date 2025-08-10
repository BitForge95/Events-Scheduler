import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", startDate: "", endDate: "" });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("accessToken");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username || "User";

  const fetchEvents = async () => {
    const res = await fetch("http://localhost:3000/read", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setEvents(data.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createOrUpdateEvent = async (e) => {
    e.preventDefault();
    if (editingId) {
      const res = await fetch(`http://localhost:3000/update/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Event Updated Successfully");
        setEditingId(null);
        setForm({ title: "", description: "", startDate: "", endDate: "" });
        fetchEvents();
      }
    } else {
      const res = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Event Created");
        setForm({ title: "", description: "", startDate: "", endDate: "" });
        fetchEvents();
      }
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    const res = await fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      toast.error("Event Deleted!!");
      fetchEvents();
    }
  };

  const startEdit = (event) => {
    setEditingId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      startDate: event.startDate?.split("T")[0],
      endDate: event.endDate?.split("T")[0],
    });
  };

  return (
    <div className="home-container">
      <div className="glass-card">
        <h1 className="home-greeting">Hello, {username} 👋</h1>
        <p className="home-subheading">Here's a look at your scheduled events</p>
      </div>

      <div className="glass-card">
        <h2 className="home-title">{editingId ? "Edit Event" : "Create Event"}</h2>
        <form onSubmit={createOrUpdateEvent} className="event-form">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
          <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
          <button type="submit" className="btn-primary">{editingId ? "Update Event" : "Create Event"}</button>
          {editingId && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setEditingId(null);
                setForm({ title: "", description: "", startDate: "", endDate: "" });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="glass-card">
        <h3 className="event-heading">Scheduled Events</h3>
        <ul className="event-list">
          {events.map((event) => (
            <li key={event._id} className="event-item">
              <div>
                <strong>{event.title}</strong> – {event.startDate?.split("T")[0]} to {event.endDate?.split("T")[0]}
                <p>{event.description}</p>
              </div>
              <div className="event-actions">
                <button className="btn-primary" onClick={() => startEdit(event)}>Edit</button>
                <button className="btn-danger" onClick={() => deleteEvent(event._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
