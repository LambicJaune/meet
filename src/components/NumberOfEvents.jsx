// src/components/NumberOfEvents.jsx
import React from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
    const handleInputChanged = (event) => {
        const value = Number(event.target.value);

          let errorText;
        if (isNaN(value) || value <= 0 || value > 50) {
            errorText = "You must enter a valid number of events"
        } else {
            errorText = "";
            setCurrentNOE(value);
        }
        setErrorAlert(errorText);
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
