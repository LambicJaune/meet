// src/components/NumberOfEvents.jsx
import React from 'react';
import { useState } from 'react';

const NumberOfEvents = () => {
  const [eventCount, setEventCount] = useState(32);

  const handleInputChanged = (event) => {
    setEventCount(Number(event.target.value));
  };

  return (
    <div id="number-of-events">
      <input
        type="number"
        role="textbox"
        value={eventCount}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
