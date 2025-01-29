import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Booking Confirmed for ${name} on ${date} at ${time} for ${people} people.`);
  };

  return (
    <div className="App">
      <h1>Book a Table at Little Lemon</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Number of People:
            <input
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              min="1"
              max="10"
              required
            />
          </label>
        </div>

        <button type="submit">Book Table</button>
      </form>
    </div>
  );
}

export default App;
