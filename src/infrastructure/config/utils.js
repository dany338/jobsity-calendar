export const dateFormat = date => {
  const newDate = new Date(date);
  const onlyDate = newDate.toLocaleDateString();
  return onlyDate;
};

export const isSomeKeyEmpty = obj => {
  for(var key in obj) {
      if(obj[key] === '')
          return true;
  }
  return false;
};

export const dayOfWeek = (day, month, year) => {
	return new Date(year, month, day).getDay();
};

export const getWeeksInMonth = (month, year) => {
  var weeks = [],
      firstDate = new Date(year, month, 1),
      lastDate  = new Date(year, month+1, 0),
      numDays   = lastDate.getDate();

  var start = 1;
  var end   = 7-firstDate.getDay();
  while(start <= numDays) {
    weeks.push({start:start,end:end});
    start = end + 1;
    end = end + 7;
    if(end>numDays)
      end=numDays;
  }

  return weeks;
};

export const calculateDatesOfWeek = (start, end, month, year) => {
  let arrDaysWeek = [0, 0, 0, 0, 0, 0, 0]; // Defined array of long = 7 days
  for (let index = start; index <= end; index++) {
    const day = dayOfWeek(index, month, year);
    arrDaysWeek[day] = {
      dayMonthWeek: index,
      monthWeek: month,
      yearMonthWeek: year,
      dateMonthWeek: new Date(year, month, index),
    };
  }

  /* Calculate the other dates in this month that not are the presente month */
  for (let index = 0; index < arrDaysWeek.length; index++) {
    const element = arrDaysWeek[index];
    if(element === 0) {
      let newDate = new Date();
      const dayStart = dayOfWeek(start, month, year);
      const dayEnd = dayOfWeek(end, month, year);

      if(index < dayStart) {
        const dateStart = arrDaysWeek[dayStart];
        const { dayMonthWeek, monthWeek, yearMonthWeek } = dateStart;
        const daysSubtract = dayStart - index;
        newDate = new Date(yearMonthWeek, monthWeek, dayMonthWeek);
        newDate.setDate(newDate.getDate() - daysSubtract);
        // console.log('newDate = index < arrDaysWeek', dayMonthWeek, monthWeek, yearMonthWeek, daysSubtract);
      } else if(index > dayEnd) {
        const dateEnd = arrDaysWeek[dayEnd];
        const { dayMonthWeek, monthWeek, yearMonthWeek } = dateEnd;
        const daysAdd = index - dayEnd;
        newDate = new Date(yearMonthWeek, monthWeek, dayMonthWeek);
        newDate.setDate(newDate.getDate() + daysAdd);
      }
      // console.info('newDate', newDate);

      arrDaysWeek[index] = {
        dayMonthWeek: newDate.getDate(),
        monthWeek: newDate.getMonth(),
        yearMonthWeek: newDate.getFullYear(),
        dateMonthWeek: newDate,
      }
    }
  }

  return arrDaysWeek;
};
