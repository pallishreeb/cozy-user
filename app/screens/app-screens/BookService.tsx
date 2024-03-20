import React, {useState} from 'react';
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
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import {axiosPrivate} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import ProfileInput from '../../components/profileInput';
import useProfileData from '../../hooks/useProfileData';
import Loader from '../../components/loader';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
const BookService = ({navigation, route}) => {
  const {providerId, serviceId} = route.params;
  const {profileData, isLoading, error: profileError} = useProfileData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
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
  const handleSubmit = async () => {
    const BookingDetails = {
      provider_id: providerId,
      service_id: serviceId,
      user_id: profileData?.id,
      address,
      booking_date: format(date, 'yyyy-MM-dd'),
      booking_time: date,
      mobile_number: phone,
    };
    // console.log(BookingDetails, 'Booking Details');
    setIsSubmitting(true);
    try {
      const response = await axiosPrivate.post(
        `${endpoints.BOOK_SERVICE}`,
        BookingDetails,
      );
      if (response.status === 201) {
        navigation.navigate('ThankYou');
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
          placeholder="Enter Your Contact Number"
        />
        <ProfileInput
          value={address}
          onChangeText={text => setAddress(text)}
          label="Address"
          placeholder="Enter Complete Address"
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
          <SubmitButton
            title={isSubmitting ? 'Booking Service' : 'Book Service'}
            disabled={isSubmitting}
            onPress={handleSubmit}
          />
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
