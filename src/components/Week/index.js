import React from 'react'
import PropTypes from 'prop-types'
/* Style Components */
import { Container } from './styled';
/* Utils */
import { calculateDatesOfWeek } from '../../infrastructure/config/utils';
/* Components */
import DateWeek from '../DateWeek';
/* Hooks */
import { useCalendar } from '../../infrastructure/hooks';

const Week = ({ start, end }) => {
  const { currentDate } = useCalendar();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const arrDatesWeek = calculateDatesOfWeek(start, end, month, year);

  return (
    <Container>
      {Array.from({ length: 7 }, (_, index) => (
        <DateWeek dateWeek={arrDatesWeek[index]}  key={index}/>
      ))}
    </Container>
  )
}

Week.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
}

export default Week;
