import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import Event from '../components/Event'; // ✅ Adjust path if needed

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature'); // ✅ Adjust path if needed

defineFeature(feature, (test) => {
  const mockEvent = {
    summary: 'React Conference',
    location: 'Berlin, Germany',
    start: { dateTime: '2025-10-10T10:00:00' },
    description: 'A conference about React and related technologies.',
    htmlLink: 'https://google.com/calendar/event?eid=12345',
  };

  test('User can show event details', ({ given, when, then }) => {
    given('a list of upcoming events is displayed', () => {
      render(<Event event={mockEvent} />);
    });

    when('the user clicks on “Show Details” for a specific event', () => {
      const button = screen.getByRole('button', { name: /show details/i });
      fireEvent.click(button);
    });

    then('the detailed information for that event should be displayed', () => {
      const details = screen.getByTestId('event-details');
      expect(details).toBeInTheDocument();
      expect(details).toHaveTextContent('About Event');
      expect(details).toHaveTextContent(mockEvent.description);
    });
  });

  test('User can hide event details', ({ given, when, then }) => {
    given('event details are currently visible for a specific event', () => {
      render(<Event event={mockEvent} />);
      fireEvent.click(screen.getByRole('button', { name: /show details/i }));
      expect(screen.getByTestId('event-details')).toBeInTheDocument(); // precondition
    });

    when('the user clicks on “Hide Details”', () => {
      fireEvent.click(screen.getByRole('button', { name: /hide details/i }));
    });

    then('the detailed information for that event should be hidden', () => {
      const details = screen.queryByTestId('event-details');
      expect(details).not.toBeInTheDocument();
    });
  });
});
