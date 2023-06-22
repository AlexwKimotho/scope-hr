import React, { useState } from 'react';
// import './Timesheet.css'; // Import the custom CSS file for styling

const Timesheet = ({ accountName }) => {
  const [timeEntries, setTimeEntries] = useState([]);

  // Function to handle adding a new time entry
  const addTimeEntry = (newEntry) => {
    setTimeEntries([...timeEntries, newEntry]);
  };

  // Function to handle deleting a time entry
  const deleteTimeEntry = (entryId) => {
    setTimeEntries(timeEntries.filter((entry) => entry.id !== entryId));
  };

  return (
    <div className="timesheet-container">
      <h2>Welcome, {accountName}!</h2>
      <h3>Timesheet</h3>
      <table className="timesheet-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timeEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.startTime}</td>
              <td>{entry.endTime}</td>
              <td>
                <button className="delete-button" onClick={() => deleteTimeEntry(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add Time Entry</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newEntry = {
            id: Date.now(),
            date: e.target.date.value,
            startTime: e.target.startTime.value,
            endTime: e.target.endTime.value,
          };
          addTimeEntry(newEntry);
          e.target.reset();
        }}
      >
        <div className="form-group">
          <label>Date:</label>
          <input type="date" name="date" required />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input type="time" name="startTime" required />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input type="time" name="endTime" required />
        </div>
        <button className="add-button" type="submit">Add</button>
      </form>
    </div>
  );
};

export default Timesheet;
