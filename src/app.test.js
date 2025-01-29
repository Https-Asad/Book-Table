import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Test case 1: Verifying if the form renders correctly
test('renders the booking form', () => {
  render(<App />);
  
  // Check if the form and its elements are rendered
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of people/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /book table/i })).toBeInTheDocument();
});

// Test case 2: Checking if input values are captured correctly
test('captures input values correctly', () => {
  render(<App />);
  
  // Get the form elements
  const nameInput = screen.getByLabelText(/name/i);
  const dateInput = screen.getByLabelText(/date/i);
  const timeInput = screen.getByLabelText(/time/i);
  const peopleInput = screen.getByLabelText(/number of people/i);
  
  // Simulate user input
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(dateInput, { target: { value: '2025-01-30' } });
  fireEvent.change(timeInput, { target: { value: '18:00' } });
  fireEvent.change(peopleInput, { target: { value: '4' } });
  
  // Assert if the values have been updated correctly
  expect(nameInput.value).toBe('John Doe');
  expect(dateInput.value).toBe('2025-01-30');
  expect(timeInput.value).toBe('18:00');
  expect(peopleInput.value).toBe('4');
});

// Test case 3: Simulating form submission
test('form submission displays correct alert', () => {
  // Mock the alert function
  window.alert = jest.fn();
  
  render(<App />);
  
  // Fill the form
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2025-01-30' } });
  fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '18:00' } });
  fireEvent.change(screen.getByLabelText(/number of people/i), { target: { value: '4' } });
  
  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /book table/i }));
  
  // Check if the alert was called with the correct values
  expect(window.alert).toHaveBeenCalledWith(
    'Booking Confirmed for John Doe on 2025-01-30 at 18:00 for 4 people.'
  );
});

// Test case 4: Validation (check if required fields are filled)
test('shows validation error when fields are empty', () => {
  render(<App />);
  
  // Simulate submitting the form with empty fields
  fireEvent.click(screen.getByRole('button', { name: /book table/i }));
  
  // Check if the required fields are being validated (we should see input fields for name, date, time, and people)
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of people/i)).toBeInTheDocument();
});
