import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';

import CustomHeader from '../../components/customHeader';
import SubmitButton from '../../components/submitButton';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {axiosPrivate} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import ProfileInput from '../../components/profileInput';
import Loader from '../../components/loader';
import {parseISO} from 'date-fns';
import useProfileData from '../../hooks/useProfileData';
const EditBooking = ({navigation, route}) => {
  const {appointment} = route.params;
  const {profileData, isLoading, error: profileError} = useProfileData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  useEffect(() => {
    if (appointment) {
      const parsedTime = parseISO(appointment?.booking_time);
      setTime(parsedTime);
      setDate(parseISO(appointment?.booking_date));
      setAddress(appointment.address);
      setPhone(appointment.mobile_number);
    }
  }, [appointment]);

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
  const handleSubmit = async () => {
    const BookingDetails = {
      //   provider_id: providerId,
      //   service_id: serviceId,
      //   user_id: profileData?.id,
      address,
      booking_date: format(date, 'yyyy-MM-dd'),
      booking_time: time,
      mobile_number: phone,
    };
    // console.log(BookingDetails, 'Booking Details');

    setIsSubmitting(true);
    try {
      const response = await axiosPrivate.put(
        `${endpoints.EDIT_BOOKING}/${appointment.id}`,
        BookingDetails,
      );
      //   console.log(response.status, 'Status of the Response');

      if (response.status === 200) {
        navigation.navigate('MyTabs', {screen: 'Appointment'});
      } else {
        Alert.alert(
          'Error',
          'Something went wrong while processing your request.',
        );
      }
      // console.log(response.data, 'Booking Service response');
    } catch (error) {
      console.log(error, 'Booking Service Error');
      Alert.alert(
        'something-went-wrong',
        'An error occurred while processing your request. Please try again later.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return <Loader />;
  } else if (profileError || !profileData) {
    return <Text>{profileError || 'An error occurred'}</Text>;
  }
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

        <Text style={styles.nameLabel}>Name</Text>
        <Text style={styles.nameText}>{profileData?.name}</Text>
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
          <Text style={styles.dateText}>{format(time, 'p')}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={false} // Explicitly set to false for AM/PM selection
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(Platform.OS === 'ios');
              if (selectedTime) {
                setTime(selectedTime);
              }
            }}
          />
        )}

        <View style={styles.buttonContainer}>
          <SubmitButton
            title={isSubmitting ? 'Editing Appointment' : 'Edit Appointment'}
            disabled={isSubmitting}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: rh(2),
  },
  headerText: {
    fontSize: rf(2),
    textTransform: 'uppercase',
    color: '#333',
    fontWeight: 'bold',
    marginLeft: rw(1),
    marginVertical: rh(2),
  },
  buttonContainer: {
    marginVertical: rh(2),
  },
  datePickerInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: rw(2.5),
    marginBottom: rh(1),
    borderRadius: rw(1.2),
    justifyContent: 'center',
    height: rh(6), // Adjust the height as necessary
  },
  datePickerText: {
    fontSize: rf(2),
    color: '#000',
  },
  label: {
    fontSize: rf(2),
    color: '#000',
    marginBottom: rh(1),
    marginLeft: rw(2),
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: rw(2.5),
    marginBottom: rh(1),
    borderRadius: rw(1.2),
    width: '100%',
  },
  dateText: {
    fontSize: rf(2),
  },
  nameText: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: rw(2.5),
    marginBottom: rh(1),
    borderRadius: rw(1.2),
    width: '100%',
    color: '#333',
    fontWeight: '500',
    textAlignVertical: 'top', // Ensures text starts from top
  },
  nameLabel: {
    fontSize: rf(2),
    color: '#000',
    marginBottom: rh(1),
    marginLeft: rw(2),
  },
});
