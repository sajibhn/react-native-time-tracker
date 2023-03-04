import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFonts } from 'expo-font';
import { firebase } from './config';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Design from './src/screens/Design';

interface DateData {
  date: string;
  startTime: number;
  endTime: number;
  id: string;
}

export default function App() {
  const [dates, setDates] = useState<DateData[]>([]);
  const [dateNumber, setDateNumber] = useState<number>();
  const [totalHours, setTotalHours] = useState<number>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const timeTrackerRef = firebase.firestore().collection('time-tracker');

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < dates.length; i++) {
      const diff = dates[i].endTime - dates[i].startTime;
      sum += diff;
    }
    setTotalHours(sum);
    setDateNumber(dates.length);
  }, [dates]);

  useEffect(() => {
    timeTrackerRef.onSnapshot((querySnapshot) => {
      let datesArr: DateData[] = [];
      querySnapshot.forEach((doc) => {
        datesArr.push({ ...doc.data(), id: doc.id } as DateData);
      });
      setDates(datesArr);
    });
  }, []);

  const [fontsLoaded] = useFonts({
    Pacifico: require('./assets/fonts/Pacifico-Regular.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  const createDate = () => {
    const newDate = {
      date: moment(new Date()).format('DD MMMM YYYY'),
      startTime: 0,
      endTime: 0,
    } as DateData;

    timeTrackerRef.add(newDate);
  };

  const previousDate = async (date: string, id: string) => {
    const previousDate = moment(date, 'DD MMMM YYYY')
      .subtract(1, 'day')
      .format('DD MMMM YYYY');
    await timeTrackerRef.doc(id).update({ date: previousDate });
  };

  const nextDate = async (date: string, id: string) => {
    const previousDate = moment(date, 'DD MMMM YYYY')
      .add(1, 'day')
      .format('DD MMMM YYYY');
    await timeTrackerRef.doc(id).update({ date: previousDate });
  };

  const handleStartTime = async (itemValue: number, id: string) => {
    await timeTrackerRef.doc(id).update({ startTime: itemValue });
  };

  const handleEndTime = async (itemValue: number, id: string) => {
    await timeTrackerRef.doc(id).update({ endTime: itemValue });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateChange = async (date?: any, id?: string) => {
    const updatedDate = moment(date).format('DD MMMM YYYY');
    await timeTrackerRef.doc(id).update({ date: updatedDate });
    hideDatePicker();
  };

  return <Design />;
}
