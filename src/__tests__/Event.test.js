import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';

describe('<Event /> component', () => {
  let event;
  beforeEach(() => {
    event = mockData[0]; // use one mock event
    render(<Event event={event} />);
  });

  test('renders event summary', () => {
    expect(screen.getByText(event.summary)).toBeInTheDocument();
  });

  test('event details are hidden by default', () => {
    const detailsElement = screen.queryByTestId('event-details');
    expect(detailsElement).not.toBeInTheDocument();
  });

  test('renders event details when "Show Details" is clicked', async () => {
  const toggleButton = screen.getByRole('button', { name: /show details/i });
  fireEvent.click(toggleButton);
  const detailsElement = await screen.findByTestId('event-details');
  expect(detailsElement).toBeInTheDocument();
});

test('hides event details when "Hide Details" is clicked again', async () => {
  const toggleButton = screen.getByRole('button', { name: /show details/i });
  fireEvent.click(toggleButton); // Show details
  fireEvent.click(toggleButton); // Hide details
  const detailsElement = await screen.queryByTestId('event-details');
  expect(detailsElement).not.toBeInTheDocument();
});

});
