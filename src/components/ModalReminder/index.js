import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import ReactDOM from 'react-dom';
import { Avatar,IconButton, Chip, Button, makeStyles } from '@material-ui/core';
import {
  ColorLens,
  Add,
  LocationCity,
  Event,
  WbSunny,
  Save,
  AccessAlarm,
  FormatColorFill,
  Send
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import Rodal from 'rodal';
import Swal from 'sweetalert2';
import { HexColorPicker } from 'react-colorful';
import { nanoid } from 'nanoid';
// include styles
import 'rodal/lib/rodal.css';
/* Style Components */
import { Container } from './styled';
/* Hooks */
import { useCalendar } from '../../infrastructure/hooks';
/* Constants */
import { defaultColors, hourMilitar, BASE_PATH_IMG } from '../../infrastructure/config/const';
/* Utils */
import { isSomeKeyEmpty } from '../../infrastructure/config/utils';
import * as WeatherServices from "../../infrastructure/services";

const modalRoot = document.getElementById('modal-root');
const customStyles = {
  overflowY: 'auto',
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: '##ff9800 !important2',
    color: '#ff9800',
  },
}));

const ModalReminder = ({ onClose }) => {
  const [cookies, _] = useCookies(['titleReminder']);
  const classes = useStyles();
  const [weather, setWeather] = useState(null);
  const [color, setColor] = useState('#4285F4');
  const titleInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const weatherInputRef = useRef(null);

  const {
    calendarAddReminderDispatch,
    calendarUpdateReminderDispatch,
    reminderSelected,
    visible,
    currentDate
  } = useCalendar();

  const handleAction = async e => {
    e.preventDefault();
    let date;
    if(typeof dateInputRef.current.value === 'string') {
      date = new Date(dateInputRef.current.value);
      date.setDate(date.getDate() + 1);
    } else {
      date = new Date(dateInputRef.current.value);
    }
    console.log('handleAction',date, typeof dateInputRef.current.value);
    const reminder = {
      _id: reminderSelected ? reminderSelected._id : nanoid(),
      date,
      title: titleInputRef.current.value,
      time: timeInputRef.current.value,
      city: cityInputRef.current.value,
      weather,
      color
    };

    if(!isSomeKeyEmpty(reminder)) {
      const {msg, err} = await reminderSelected ? calendarUpdateReminderDispatch(reminder) : calendarAddReminderDispatch(reminder);
      if(err) {
        Swal.fire({
          title: 'Oops...',
          icon: 'error',
          text: `Something went wrong! ${msg}`,
          confirmButtonText: 'OK'
        })
      } else {
        titleInputRef.current.value = '';
        dateInputRef.current.value = '';
        timeInputRef.current.value = '';
        cityInputRef.current.value = '';
        weatherInputRef.current.value = '';
        setColor('#4285F4');
        setWeather(null);
        onClose();
      }
    } else {
      Swal.fire({
        title: 'Fill the fields empties!',
        icon: 'info',
        text: `Something fields there are empties!. `,
        confirmButtonText: 'OK'
      })
    }
    // e.stopPropagation();
  };

  const handleChangeCity = async e => {
    e.preventDefault();
    const { value: query } = e.currentTarget;
    if(query.length > 2) {
      const data = await WeatherServices.apiWeather.getWeather(query);
      console.log('data', data);
      if(typeof data === 'object') {
        const { coord, main, weather, sys } = data;
        const { country } = sys;
        const { temp, temp_min, temp_max, humidity, pressure } = main;
        const { lon: lng, lat } = coord;
        const { main: title, description, icon } = weather[0];
        weatherInputRef.current.value = `${temp}°c humidity: ${humidity} ${title} - ${description} country: ${country} lon: ${lng} lat: ${lat}`;
        setWeather(data);
      }
    }
  };

  const load = useCallback(async () => {
    if(reminderSelected !== null) {
      console.log('entro por aca 1');
      const { coord, main, weather, sys } = reminderSelected.weather;
      const { country } = sys;
      const { temp, temp_min, temp_max, humidity, pressure } = main;
      const { lon: lng, lat } = coord;
      const { main: title, description, icon } = weather[0];

      titleInputRef.current.value = reminderSelected.title;

      const newDate = reminderSelected.date.toLocaleDateString().split(',')[0];
      const newDateFormat = newDate.split('/');
      const newMonth = (newDateFormat[0] < 10) ? `0${newDateFormat[0]}` : newDateFormat[0];
      const newDay = (newDateFormat[1] < 10) ? `0${newDateFormat[1]}` : newDateFormat[1];
      dateInputRef.current.value = `${newDateFormat[2]}-${newMonth}-${newDay}`;

      timeInputRef.current.value = reminderSelected.time;
      cityInputRef.current.value = reminderSelected.city;
      weatherInputRef.current.value = `${temp}°c humidity: ${humidity} ${title} - ${description} country: ${country} lon: ${lng} lat: ${lat}`;
      setWeather(reminderSelected.weather);
      setColor(reminderSelected.color);
    } else {
      console.log(currentDate.toLocaleDateString(), currentDate.toLocaleTimeString());
      // dateInputRef.current.value = currentDate.toISOString().split('T')[0];
      const newDate = currentDate.toLocaleDateString().split(',')[0];
      const newDateFormat = newDate.split('/');
      const newMonth = (newDateFormat[0] < 10) ? `0${newDateFormat[0]}` : newDateFormat[0];
      const newDay = (newDateFormat[1] < 10) ? `0${newDateFormat[1]}` : newDateFormat[1];
      dateInputRef.current.value = `${newDateFormat[2]}-${newMonth}-${newDay}`;


      const newTime = currentDate.toLocaleTimeString().split(':');
      const newHour = (newTime[0] < 10) ? `0${newTime[0]}` : newTime[0];
      const hourReplaceIni = Object.entries(hourMilitar).filter(([_, value]) => (value === newHour));
      timeInputRef.current.value = (hourReplaceIni.length > 0) ? `${hourReplaceIni[0][0]}:${newTime[1]}` : `${newHour}:${newTime[1]}`;
      console.log('entro por aca 2', `${newHour}:${newTime[1]}`, hourReplaceIni);
      titleInputRef.current.value = cookies.titleReminder ? cookies.titleReminder : '';
    }
  }, [cookies, currentDate, reminderSelected]);

  useEffect(() => {
    console.log('reminderSelected', reminderSelected, dateInputRef.current.value, timeInputRef.current.value);
    load();
  }, [load, reminderSelected, dateInputRef, timeInputRef]);

  return ReactDOM.createPortal(
    <Rodal
      visible={visible}
      onClose={onClose}
      animation="zoom"
      customStyles={customStyles}
      className="modal-rodal-container"
      width={30}
      height={60}
      measure="%"
      closeOnEsc
    >
      <Container>
        <div className="modal__title">
        <h4>Reminder for date: {reminderSelected ? reminderSelected.date.toDateString() : currentDate.toDateString()}</h4>
        </div>
        <div className="modal__content">
          <div className="modal__input">
            <div className="modal__inputContainer">
              <Add />
              <input ref={titleInputRef} name="title" placeholder="Enter your title for reminder" type="text" />
            </div>
          </div>
          <div className="modal__input">
            <div className="modal__inputContainer">
              <Event />
              <input ref={dateInputRef} name="date" placeholder="Enter your date" type="date" />
            </div>
          </div>
          <div className="modal__input">
            <div className="modal__inputContainer">
              <AccessAlarm />
              <input ref={timeInputRef} name="time" placeholder="Enter your time" type="time" />
            </div>
          </div>
          <div className="modal__input">
            <div className="modal__inputContainer">
              <LocationCity />
              <input ref={cityInputRef} name="city" placeholder="Enter your city min three letters" type="text" onChange={(e) => handleChangeCity(e)} />
            </div>
          </div>
          <div className="modal__input">
            <div className="modal__inputContainer" read="true">
              <WbSunny />
              <input ref={weatherInputRef} name="weather" placeholder="Weather..." type="text" readOnly />
              {weather && (
                <Avatar src={`${BASE_PATH_IMG}${weather.weather[0].icon}@2x.png`} />
              )}
            </div>
          </div>
          <HexColorPicker color={color} onChange={setColor} />
          <div className="value" style={{ borderLeftColor: color }}>
            Current color of reminder is {color}
          </div>
          <div className="buttons">
            {defaultColors.map((color, index) => (
                <Chip
                  key={index}
                  size="small"
                  icon={<FormatColorFill style={{ color: 'black' }} />}
                  label={color.label}
                  style={{ backgroundColor: color.color, color: '#000' }}
                  onClick={() => setColor(color.color)}
                />
            ))}
          </div>
          <Button
            variant="outlined"
            className={classes.button}
            endIcon={<Send />}
            onClick={(e) => handleAction(e)}
          >
            Save reminder
          </Button>
        </div>
      </Container>
    </Rodal>,
    modalRoot
  )
}

ModalReminder.propTypes = {

}

export default ModalReminder;
