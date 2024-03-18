import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns'; // Import format from date-fns for date formatting

import CustomHeader from '../../components/customHeader';
import SubmitButton from '../../components/submitButton';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';

import ProfileInput from '../../components/profileInput';

const BookService = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const displayDatePicker = () => {
    setShowDatePicker(true);
  };

  const displayTimePicker = () => {
    setShowTimePicker(true);
  };
  const handleSubmit = () => {
    navigation.navigate('ThankYou');
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNotification={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>
          Before Booking ,Provide Some Information
        </Text>
        {/* Existing ProfileInputs */}
        <ProfileInput
          value={name}
          onChangeText={text => setName(text)}
          label="Name"
          placeholder="John Doe"
        />
        <ProfileInput
          value={phone}
          onChangeText={text => setPhone(text)}
          label="Phone"
          placeholder="9832686823"
        />
        <ProfileInput
          value={address}
          onChangeText={text => setAddress(text)}
          label="Address"
          placeholder="21st Street, New York"
          multiline={true}
        />
        {/* Date Picker */}
        <Text style={styles.label}>Select Date</Text>
        <TouchableOpacity onPress={displayDatePicker} style={styles.dateInput}>
          <Text style={styles.dateText}>{format(date, 'PP')}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Time Picker */}
        <Text style={styles.label}>Select Time</Text>
        <TouchableOpacity onPress={displayTimePicker} style={styles.dateInput}>
          <Text style={styles.dateText}>{format(date, 'p')}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            is24Hour={false} // Explicitly set to false for AM/PM selection
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(Platform.OS === 'ios');
              if (selectedTime) {
                setDate(selectedTime);
              }
            }}
          />
        )}

        <View style={styles.buttonContainer}>
          <SubmitButton title="Book Service" onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: hp(2),
  },
  headerText: {
    fontSize: fp(2),
    textTransform: 'uppercase',
    color: '#333',
    fontWeight: 'bold',
    marginLeft: wp(1),
    marginVertical: hp(2),
  },
  buttonContainer: {
    marginVertical: hp(2),
  },
  datePickerInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: wp(2.5),
    marginBottom: hp(1),
    borderRadius: wp(1.2),
    justifyContent: 'center',
    height: hp(6), // Adjust the height as necessary
  },
  datePickerText: {
    fontSize: fp(2),
    color: '#000',
  },
  label: {
    fontSize: fp(2),
    color: '#000',
    marginBottom: hp(1),
    marginLeft: wp(2),
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: wp(2.5),
    marginBottom: hp(1),
    borderRadius: wp(1.2),
    width: '100%',
  },
  dateText: {
    fontSize: fp(2),
  },
});
