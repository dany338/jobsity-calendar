import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Chip } from '@material-ui/core';
import { Face } from '@material-ui/icons';
/* Style Components */
import { Container } from './styled';
/* Assets */
import Assets from '../../assets';
/* Hooks */
import { dateFormat } from '../../infrastructure/config/utils';
/* Constants */
import { BASE_PATH_IMG } from '../../infrastructure/config/const';

const Reminder = ({ _id = 0, title = '', color = '', city = '', time = '', date = '', weather = {}, onClick }) => {

  if(_id === 0) return null;
  const { main, weather: climate } = weather;
  const { icon } = climate[0];
  const { temp } = main;

  return (
    <Container tabIndex={0} onClick={onClick}>
      <Avatar src={`${BASE_PATH_IMG}${icon}@2x.png`} />
      <div className="issue__info">
        <h2>{city} - <small style={{ color: 'lightgray' }}>{`${temp} °c ${dateFormat(date)}`}</small></h2>
        <h4>{`Time: ${time}`}</h4>
        <Chip
          size="small"
          icon={<Face />}
          label={title}
          style={{ backgroundColor: color }}
        />
      </div>
    </Container>
  )
};

Reminder.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  city: PropTypes.string,
  time: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  weather: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    coord: PropTypes.shape({
      lon: PropTypes.number,
      lat: PropTypes.number
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        main: PropTypes.string,
        description: PropTypes.string,
        icon: PropTypes.string,
      })
    ),
    main: PropTypes.shape({
      temp: PropTypes.number,
      pressure: PropTypes.number,
      humidity: PropTypes.number,
      temp_min: PropTypes.number,
      temp_max: PropTypes.number,
    })
  }),
  onClick: PropTypes.func,
};

Reminder.defaultProps = {
  _id: 0,
  title: '',
  color: '',
  city: '',
  time: '',
  date: '',
  weather: {},
  onClick: () => { },
};

export default Reminder;
