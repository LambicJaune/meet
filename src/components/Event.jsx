import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.location}</p>
      <p>{new Date(event.start.dateTime).toLocaleString()}</p>

      <button className="details-button" onClick={handleToggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div data-testid="event-details">
          <h3>About Event</h3>
          <p>{event.description}</p>
          <a href={event.htmlLink} target="_blank" rel="noreferrer">
            View on Google Calendar
          </a>
        </div>
      )}
    </li>
  );
};

export default Event;
