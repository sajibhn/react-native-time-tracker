import {
  View,
  Text,
  StyleSheet,
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
                      <Text>{`<`}</Text>
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
                      <Text>{`>`}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2DA771',
    paddingTop: 36,
    paddingLeft: 16,
    paddingBottom: 36,
    paddingRight: 16,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
    fontFamily: 'Pacifico',
  },
  timeTracker: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    paddingRight: 8,
    elevation: 4, // add shadow effect
    borderRadius: 10, // set the border radius
  },
  timeTrackerContainer: {
    flex: 1,
  },
  singleDay: {
    borderBottomWidth: 1,
    borderBottomColor: ' rgba(45, 167, 113, 0.5)',
    paddingBottom: 8,
    paddingTop: 8,
    justifyContent: 'flex-start',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: ' rgba(45, 167, 113, 0.5)',
    paddingTop: 16,
    paddingBottom: 16,
  },
  button: {
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#C7F0DF',
    borderRadius: 4,
    width: 150,
  },
  buttonText: {
    color: 'rgba(45, 167, 113, 1)',
    textAlign: 'center',
    fontFamily: 'InterRegular',
    fontSize: 12,
    fontWeight: '400',
  },
  dayName: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: 'rgba(45, 167, 113, 1)',
    fontFamily: 'PoppinsRegular',
  },
  singleDayControll: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  singleDayControllDate: {
    fontSize: 12,
    color: '#32A071',
    fontFamily: 'PoppinsRegular',
  },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  timesHeading: {
    fontSize: 14,
    color: 'rgba(0,0,0,.5)',
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: 'PoppinsMedium',
  },
  pickerContainer: {
    borderRadius: 10,
    borderColor: 'rgba(45, 167, 113, 1)',
    borderWidth: 1,
  },
  hours: {
    backgroundColor: 'background: rgba(199, 240, 223, 1)',
    borderRadius: 10,
    alignSelf: 'stretch',
    flexGrow: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hoursText: {
    fontSize: 12,
    fontWeight: '500',
    color: ' rgba(45, 167, 113, 1)',
  },
  totalContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  totalHeading: {
    fontSize: 14,
    color: '#00502E',
    fontWeight: '400',
    fontFamily: 'PoppinsRegular',
  },

  totalValue: {
    color: '#00502E',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'PoppinsMedium',
  },
});
