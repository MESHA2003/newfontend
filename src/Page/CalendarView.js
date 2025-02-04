import React from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
  const handleDateClick = (date) => {
    alert(`Selected date: ${date.toDateString()}`);
  };

  return (
    <div>
      <h3>Calendar</h3>
      <Calendar onClickDay={handleDateClick} />
    </div>
  );
};

export default CalendarView;
