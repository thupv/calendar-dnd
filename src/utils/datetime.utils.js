import moment from 'moment'

export const getCurrentWeek = () => {
  const currentDate = moment();
  const weekStart = currentDate.clone().startOf('isoWeek');

  let days = [];
  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days'));
  }
  return days;
};

export const isToday = (date) => {
  return date.isSame(moment(), 'd');
};

export const formatDayOfWeek = date => date.format('ddd');

export const formatDayOfMonth = date => date.format('D');

export const normalizeDate = date => date.format('YYYYMMDD')
