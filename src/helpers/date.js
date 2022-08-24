// Library imports
import date from 'date-and-time';

export const getCurrentDate = () => {
  return date.format(new Date(), "MM-DD-YYYY");
}

export const getCurrentTime = () => {
  return date.format(new Date(), "hh:mm:ss");
}

export const getCurrentDateTime = () => {
  return `${getCurrentDate()} ${getCurrentTime()}`
}

export const getCurrentFromFormat = (format) => {
  return date.format(new Date(), format);
}