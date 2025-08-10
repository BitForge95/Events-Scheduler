import React, { useState, useEffect } from "react";
import axios from "axios";

function Update({ eventId }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        
        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`https://events-scheduler-backend-production.up.railway.app/event/${eventId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTitle(res.data.title);
                setDescription(res.data.description);
                setStartDate(res.data.startDate.split("T")[0]);
                setEndDate(res.data.endDate.split("T")[0]);
            } catch (err) {
                setErrorMessage("Error fetching event data");
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `https://events-scheduler-backend-production.up.railway.app/update/${eventId}`,
                { title, description, startDate, endDate },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setErrorMessage("");
            alert("Event updated successfully");
        } catch (error) {
            setErrorMessage("Failed to update event");
        }
    };

    return (
        <div>
            <h2>Update Event</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <br />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                <br />
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <br />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <br />
                <button type="submit">Update</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default Update;
