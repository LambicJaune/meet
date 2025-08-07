// src/components/NumberOfEvents.jsx
import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const handleInputChanged = (event) => {
    setCurrentNOE(Number(event.target.value));
  };

    return (
        <div id="number-of-events">
            <input
                type="number"
                role="textbox"
                value={currentNOE}
                onChange={handleInputChanged}
            />
        </div>
    );
};

export default NumberOfEvents;
