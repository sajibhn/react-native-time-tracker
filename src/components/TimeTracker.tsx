import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { firebase } from '../db/config';
import moment from 'moment';
import {
  createDate,
  handleEndTime,
  handleStartTime,
  nextDate,
  previousDate,
} from '../functions/function';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from '../styles/styles';
import { LeftChev, RightChev } from './icons';

interface DateData {
  date: string;
  startTime: number;
  endTime: number;
  id: string;
}

const TimeTracker = () => {
  const [dates, setDates] = useState<DateData[]>([]);
  const [dateNumber, setDateNumber] = useState<number>();
  const [totalHours, setTotalHours] = useState<number>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<any>(null);
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

  const showDatePicker = (itemId: string) => {
    setSelectedItemId(itemId);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateChange = async (date?: any) => {
    if (selectedItemId) {
      const item = dates.find((item) => item.id === selectedItemId);
      const updatedDate = moment(date).format('DD MMMM YYYY');
      await timeTrackerRef.doc(item?.id).update({ date: updatedDate });
      setDatePickerVisibility(false);
      setSelectedItemId(null);
    }
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View>
        <Text style={styles.title}>Time Tracker</Text>
      </View>

      <View style={styles.timeTracker}>
        <ScrollView>
          <View style={styles.timeTrackerContainer}>
            {/* button */}
            <TouchableOpacity style={styles.button} onPress={createDate}>
              <Text style={styles.buttonText}>Add New Date</Text>
            </TouchableOpacity>
            {/* single day */}

            {dates.map((item, i) => {
              const { date, startTime, endTime, id } = item;
              return (
                <View style={styles.singleDay} key={i}>
                  <View>
                    <Text style={styles.dayName}>
                      {moment(item?.date, 'DD MMMM YYYY').format('dddd')}
                    </Text>
                  </View>
                  <View style={styles.singleDayControll}>
                    <TouchableOpacity onPress={() => previousDate(date, id)}>
                      <LeftChev width={12} height={12} />
                    </TouchableOpacity>

                    <View>
                      <TouchableOpacity onPress={() => showDatePicker(id)}>
                        <Text style={styles.singleDayControllDate}>{date}</Text>
                      </TouchableOpacity>
                      {isDatePickerVisible && selectedItemId === id && (
                        <DateTimePickerModal
                          isVisible={true}
                          mode="date"
                          onConfirm={handleDateChange}
                          onCancel={() => setDatePickerVisibility(false)}
                        />
                      )}
                    </View>
                    <TouchableOpacity onPress={() => nextDate(date, id)}>
                      <RightChev width={12} height={12} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.times}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.timesHeading}>Start Time</Text>
                      <View style={styles.pickerContainer}>
                        <Picker
                          style={{
                            width: 110,
                            height: 50,
                            transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
                            color: 'rgba(45, 167, 113, 1)',
                          }}
                          selectedValue={startTime}
                          onValueChange={(itemValue) =>
                            handleStartTime(itemValue, id)
                          }
                        >
                          <Picker.Item value="00" label="12:00 AM" />
                          <Picker.Item value="1" label="1:00 AM" />
                          <Picker.Item value="2" label="2:00 AM" />
                          <Picker.Item value="3" label="3:00 AM" />
                          <Picker.Item value="4" label="4:00 AM" />
                          <Picker.Item value="5" label=" 5:00 AM" />
                          <Picker.Item value="6" label="6:00 AM" />
                          <Picker.Item value="7" label="7:00 AM" />
                          <Picker.Item value="8" label="8:00 AM" />
                          <Picker.Item value="9" label="9:00 AM" />
                          <Picker.Item value="10" label="10:00 AM" />
                          <Picker.Item value="11" label="11:00 AM" />
                          <Picker.Item value="12" label="12:00 PM" />
                          <Picker.Item value="13" label="1:00 PM" />
                          <Picker.Item value="14" label="2:00 PM" />
                          <Picker.Item value="15" label="3:00 PM" />
                          <Picker.Item value="16" label="4:00 PM" />
                          <Picker.Item value="17" label=" 5:00 PM" />
                          <Picker.Item value="18" label="6:00 PM" />
                          <Picker.Item value="19" label="7:00 PM" />
                          <Picker.Item value="20" label="8:00 PM" />
                          <Picker.Item value="21" label=" 9:00 PM" />
                          <Picker.Item value="22" label="10:00 PM" />
                          <Picker.Item value="23" label=" 11:00 PM" />
                        </Picker>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.timesHeading}>End Time</Text>
                      <View style={styles.pickerContainer}>
                        <Picker
                          style={{
                            width: 110,
                            height: 50,
                            transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
                            color: 'rgba(45, 167, 113, 1)',
                          }}
                          selectedValue={endTime}
                          onValueChange={(itemValue) =>
                            handleEndTime(itemValue, id)
                          }
                        >
                          <Picker.Item value="00" label="12:00 AM" />
                          <Picker.Item value="1" label="1:00 AM" />
                          <Picker.Item value="2" label="2:00 AM" />
                          <Picker.Item value="3" label="3:00 AM" />
                          <Picker.Item value="4" label="4:00 AM" />
                          <Picker.Item value="5" label=" 5:00 AM" />
                          <Picker.Item value="6" label="6:00 AM" />
                          <Picker.Item value="7" label="7:00 AM" />
                          <Picker.Item value="8" label="8:00 AM" />
                          <Picker.Item value="9" label="9:00 AM" />
                          <Picker.Item value="10" label="10:00 AM" />
                          <Picker.Item value="11" label="11:00 AM" />
                          <Picker.Item value="12" label="12:00 PM" />
                          <Picker.Item value="13" label="1:00 PM" />
                          <Picker.Item value="14" label="2:00 PM" />
                          <Picker.Item value="15" label="3:00 PM" />
                          <Picker.Item value="16" label="4:00 PM" />
                          <Picker.Item value="17" label=" 5:00 PM" />
                          <Picker.Item value="18" label="6:00 PM" />
                          <Picker.Item value="19" label="7:00 PM" />
                          <Picker.Item value="20" label="8:00 PM" />
                          <Picker.Item value="21" label=" 9:00 PM" />
                          <Picker.Item value="22" label="10:00 PM" />
                          <Picker.Item value="23" label=" 11:00 PM" />
                        </Picker>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.timesHeading}>Hours</Text>
                      <View style={styles.hours}>
                        <Text style={styles.hoursText}>
                          {Math.abs(item.startTime - item.endTime)} Hours
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        {/* total day and hour */}
        <View style={styles.total}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalHeading}>Total Day</Text>
            <Text style={styles.totalValue}>{dateNumber} days</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalHeading}>Total Hours</Text>
            <Text style={styles.totalValue}>{totalHours} Hours</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TimeTracker;
