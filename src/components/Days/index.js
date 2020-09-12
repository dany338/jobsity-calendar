import React from 'react'
import PropTypes from 'prop-types'
/* Style Components */
import { Container } from './styled';
/* Constants */
import { daysWeek } from '../../infrastructure/config/const';

const Days = ({ day }) => {
  return (
    <Container>
      <h2>
        {daysWeek[day]}
      </h2>
    </Container>
  )
}

Days.propTypes = {
  day: PropTypes.number.isRequired,
}

export default Days;
