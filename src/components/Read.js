import React, { useEffect, useState } from "react";
import axios from "axios";

export function Read() {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getAllEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/read");
      console.log("Events received:", res.data);
      setEvents(res.data); 
    } catch (error) {
      console.error("Error occurred while fetching event data", error);
      setErrorMessage("Error occurred while fetching event data");
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="Events-Container">
      <h2>Events</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event, index) => (
          <div key={index} className="event">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Start:</strong> {event.startDate}</p>
            <p><strong>End:</strong> {event.endDate}</p>
          </div>
        ))
      )}
    </div>
  );
}
