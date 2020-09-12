import React from 'react'
import PropTypes from 'prop-types'
/* Style Components */
import { Container } from './styled';
/* Components */
import Days from '../Days';
import Week from '../Week';
/* Hooks */
import { useCalendar } from '../../infrastructure/hooks';
/* Utils */
import { getWeeksInMonth } from '../../infrastructure/config/utils';

const Calendar = props => {
  const { currentDate } = useCalendar();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const weeks = getWeeksInMonth(month, year);

  return (
    <Container>
      {Array.from({ length: 7 }, (_, index) => (
        <Days day={index} key={index}/>
      ))}
      {weeks.map((week, index) => (
          <Week key={index} {...week} />
      ))}
    </Container>
  )
};

Calendar.propTypes = {

};

export default Calendar;
