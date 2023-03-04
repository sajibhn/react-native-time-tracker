import moment from 'moment';

interface DateData {
  date: string;
  startTime: number;
  endTime: number;
  id: string;
}

import { firebase } from '../db/config';
const timeTrackerRef = firebase.firestore().collection('time-tracker');

export const createDate = () => {
  const newDate = {
    date: moment(new Date()).format('DD MMMM YYYY'),
    startTime: 0,
    endTime: 0,
  } as DateData;

  timeTrackerRef.add(newDate);
};

export const previousDate = async (date: string, id: string) => {
  const previousDate = moment(date, 'DD MMMM YYYY')
    .subtract(1, 'day')
    .format('DD MMMM YYYY');
  await timeTrackerRef.doc(id).update({ date: previousDate });
};

export const nextDate = async (date: string, id: string) => {
  const previousDate = moment(date, 'DD MMMM YYYY')
    .add(1, 'day')
    .format('DD MMMM YYYY');
  await timeTrackerRef.doc(id).update({ date: previousDate });
};

export const handleStartTime = async (itemValue: number, id: string) => {
  await timeTrackerRef.doc(id).update({ startTime: itemValue });
};

export const handleEndTime = async (itemValue: number, id: string) => {
  await timeTrackerRef.doc(id).update({ endTime: itemValue });
};
