import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    gap: 16,
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
