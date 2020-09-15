import React from 'react'
import PropTypes from 'prop-types'
/* Style Components */
import { Container } from './styled';
/* Hooks */
import { useCalendar } from '../../infrastructure/hooks';

const DateWeek = ({ dateWeek }) => {
  const {
    calendarChangeMonthDispatch,
    calendarModalChangeVisibleDispatch,
    calendarSelectedReminderDispatch,
    currentDate,
    reminders
  } = useCalendar();
  const month = currentDate.getMonth();
  const { dayMonthWeek, monthWeek, yearMonthWeek } = dateWeek;
  const isDayMonthCurrent = (monthWeek === month);
  const isSameDateAs = () => {
    return (
      currentDate.getFullYear() === yearMonthWeek &&
      currentDate.getMonth() === monthWeek &&
      currentDate.getDate() === dayMonthWeek
    );
  };

  const isCurrentDate = isSameDateAs(currentDate);

  const findRemindersInDate = () => {
    const remindersInDate = reminders.filter((reminder) => reminder.date.getFullYear() === yearMonthWeek && reminder.date.getMonth() === monthWeek && reminder.date.getDate() === dayMonthWeek );
    console.log(yearMonthWeek, monthWeek, dayMonthWeek);
    remindersInDate.sort((a, b) => {
      const timeA = a.time.split(':');
      const timeB = b.time.split(':');
      const dateA = new Date(yearMonthWeek, monthWeek, dayMonthWeek, Number(timeA[0]), Number(timeA[1]));
      const dateB = new Date(yearMonthWeek, monthWeek, dayMonthWeek, Number(timeB[0]), Number(timeB[1]));
      return dateA - dateB;
    });
    console.log('remindersInDate', remindersInDate);
    return remindersInDate;
  };

  const remindersInDate = findRemindersInDate();

  const handleAddReminder = async e => {
    e.preventDefault();
    const newDate = new Date(yearMonthWeek, monthWeek, dayMonthWeek);
    await calendarChangeMonthDispatch(newDate);
    await calendarModalChangeVisibleDispatch(true);
    // e.stopPropagation();
  };

  const handleSelection = async (e, reminder) => {
    e.preventDefault();
    await calendarSelectedReminderDispatch(reminder);
    await calendarModalChangeVisibleDispatch(true);
    e.stopPropagation();
  };

  return (
    <Container isDayMonthCurrent={isDayMonthCurrent} isCurrentDate={isCurrentDate} onClick={(e) => handleAddReminder(e) }>
      <div className="dateWeek__header">
        <h4>
          {dayMonthWeek}
        </h4>
        {remindersInDate.length > 0 && (<small style={{ color: 'red' }}>{remindersInDate.length}</small>)}
      </div>
      {remindersInDate.length > 0 && (
        <div className="dateWeek__content">
          {remindersInDate.map((reminder) => (
            <div key={`reminder-in-date-${reminder._id}`}>
              <h6 onClick={(e) => handleSelection(e, reminder) } style={{ backgroundColor: reminder.color }}>● {reminder.time} - {`${reminder.title.substring(0, 10)}...`}</h6>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}

DateWeek.propTypes = {
  dateWeek: PropTypes.shape({
    dayMonthWeek: PropTypes.number.isRequired,
    monthWeek: PropTypes.number.isRequired,
    yearMonthWeek: PropTypes.number.isRequired,
    dateMonthWeek: PropTypes.instanceOf(Date),
  }).isRequired
}

export default DateWeek
