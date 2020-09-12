import React from 'react'
import PropTypes from 'prop-types'
/* Style Components */
import { Container } from './styled';
/* Hooks */
import { useCalendar } from '../../infrastructure/hooks';

const DateWeek = ({ dateWeek }) => {
  const { currentDate } = useCalendar();
  const month = currentDate.getMonth();
  const { dayMonthWeek, monthWeek } = dateWeek;
  const isDayMonthCurrent = (monthWeek === month);

  return (
    <Container isDayMonthCurrent={isDayMonthCurrent} >
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
