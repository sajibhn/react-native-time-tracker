import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useFonts } from 'expo-font';
import TimeTracker from './src/components/TimeTracker';

export default function App() {
  const [fontsLoaded] = useFonts({
    Pacifico: require('./assets/fonts/Pacifico-Regular.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return <TimeTracker />;
}
