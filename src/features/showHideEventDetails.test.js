import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defineFeature, loadFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('Default number of events is shown when user hasn’t specified', ({ given, when, then }) => {
    given('the user hasn’t entered any number in the "Number of events" input', () => {
      // No action needed
    });

    when('the app loads', () => {
      render(<App />);
    });

    then(/^a default number of events \(e.g., (\d+)\) should be displayed$/, async (num) => {
      await waitFor(() => {
        const events = document.querySelectorAll('#event-list li.event');
        expect(events.length).toBe(Number(num));
      });
    });
  });

  test('User can set the number of events to display', ({ given, when, then }) => {
    given('the user is on the main event list page', () => {
      render(<App />);
    });

    when(/^the user enters a number \(e.g., (\d+)\) in the "Number of events" input field$/, async (num) => {
      const user = userEvent.setup();
      const input = document.querySelector('#number-of-events input[type="number"]');
      expect(input).toBeInTheDocument();
      await user.clear(input);
      await user.type(input, num);
    });

    then(/^only that number of events \(e.g., (\d+)\) should be displayed$/, async (num) => {
      await waitFor(() => {
        const events = document.querySelectorAll('#event-list li.event');
        expect(events.length).toBe(Number(num));
      });
    });
  });
});
