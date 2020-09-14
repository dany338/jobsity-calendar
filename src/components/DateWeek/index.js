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
    currentDate
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

  const handleAddReminder = async e => {
    e.preventDefault();
    const newDate = new Date(yearMonthWeek, monthWeek, dayMonthWeek);
    await calendarChangeMonthDispatch(newDate);
    await calendarModalChangeVisibleDispatch(true);
    e.stopPropagation();
  };

  return (
    <Container isDayMonthCurrent={isDayMonthCurrent} isCurrentDate={isCurrentDate} onClick={(e) => handleAddReminder(e) }>
      <h4>
        {dayMonthWeek}
      </h4>
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
