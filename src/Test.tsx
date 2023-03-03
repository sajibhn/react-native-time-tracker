import { View, Text } from 'react-native';
import React from 'react';

const Test = () => {
  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text>Time Tracker</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={createDate}>
        <Text>Add New Date</Text>
      </TouchableOpacity>

      <View>
        <FlatList
          data={dates}
          numColumns={1}
          renderItem={({ item }) => (
            <View>
              <View>
                <TouchableOpacity
                  onPress={() => previousDate(item.date, item.id)}
                >
                  <Text>prev</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showDatePicker}>
                  <Text>{item.date}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => handleDateChange(date, item.id)}
                  onCancel={hideDatePicker}
                />
                <TouchableOpacity onPress={() => nextDate(item.date, item.id)}>
                  <Text>next</Text>
                </TouchableOpacity>
                <Text>{moment(item?.date, 'DD MMMM YYYY').format('dddd')}</Text>
              </View>
              <View>
                <Picker
                  selectedValue={item.startTime}
                  onValueChange={(itemValue) =>
                    handleStartTime(itemValue, item.id)
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
              <View>
                <Picker
                  selectedValue={item.endTime}
                  onValueChange={(itemValue) =>
                    handleEndTime(itemValue, item.id)
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
              <View>
                <Text>{Math.abs(item.startTime - item.endTime)} hours</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View>
        <Text>Total Day {dateNumber}</Text>
        <Text>Total Hours {totalHours}</Text>
      </View>
    </View>
  );
};

export default Test;
