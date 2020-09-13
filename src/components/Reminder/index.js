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

const Reminder = ({ _id = 0, title = '', color = '', city = '', time = '', date = '', onClick }) => {

  if(_id === 0) return null;

  return (
    <Container tabIndex={0} onClick={onClick}>
      <Avatar src={Assets.logo} />
      <div className="issue__info">
        <h2>{city} - <small>{dateFormat(date)}</small></h2>
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
  _id: PropTypes.number,
  title: PropTypes.string,
  color: PropTypes.string,
  city: PropTypes.string,
  time: PropTypes.string,
  date: PropTypes.string,
  onClick: PropTypes.func,
};

Reminder.defaultProps = {
  _id: 0,
  title: '',
  color: '',
  city: '',
  time: '',
  date: '',
  onClick: () => { },
};

export default Reminder;
