import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
// import Header from '../../components/header';
import AppointmentCard from '../../components/appointmentCard';
import CustomHeader from '../../components/customHeader';
import useProfileData from '../../hooks/useProfileData';
import useAppointments from '../../hooks/useAppointments';
import {useFocusEffect} from '@react-navigation/native';

import Loader from '../../components/loader';

const Appointment = ({navigation}) => {
  const [showPastAppointments, setShowPastAppointments] = useState(false);
  const {
    profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useProfileData();
  const {
    appointments,
    isLoading,
    error,
    refreshAppointments,
    cancelAppointment,
  } = useAppointments(profileData?.id!, showPastAppointments);
  useFocusEffect(
    React.useCallback(() => {
      // Call the function to refresh appointments here
      // This assumes your useAppointments hook is designed to refetch data when invoked
      if (profileData?.id) {
        refreshAppointments(); // You might need to modify your hook to expose a method to refresh the appointments explicitly or ensure it automatically refetches when invoked.
      }
    }, [showPastAppointments, profileData?.id!]),
  );
  const renderHeader = () => (
    <>
      <Text style={styles.headerText1}>
        <Text style={{color: '#333'}}>Your</Text> Appointments
      </Text>
      <Text style={styles.headerText2}>Your Appointments List</Text>
      <View style={styles.grayBar}></View>
      <View style={styles.toggleButtonsContainer}>
        <TouchableOpacity
          onPress={() => setShowPastAppointments(false)}
          style={[
            styles.toggleButton,
            !showPastAppointments && styles.toggleButtonActive,
          ]}>
          <Text
            style={[
              styles.toggleButtonText,
              !showPastAppointments && styles.toggleActiveButtonText,
            ]}>
            Recent Appointments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowPastAppointments(true)}
          style={[
            styles.toggleButton,
            showPastAppointments && styles.toggleButtonActive,
          ]}>
          <Text
            style={[
              styles.toggleButtonText,
              showPastAppointments && styles.toggleActiveButtonText,
            ]}>
            All Appointments
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
      <CustomHeader
        isNotification={true}
        onBackPress={() => {
          navigation.goBack();
        }}
        onNotificationPress={() => {
          navigation.navigate('Notification');
        }}
      />
      {isLoading || profileLoading ? (
        <Loader />
      ) : error || profileError ? (
        <Text>
          Error: {profileError || error?.message || 'An Error occured!'}
        </Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={({item}) => (
            <AppointmentCard
              appointment={item}
              onEdit={() =>
                navigation.navigate('EditBooking', {appointment: item})
              }
              onCancel={() => {
                cancelAppointment(item?.id);
                refreshAppointments();
              }}
              onChat={() => navigation.navigate('Chat')}
            />
          )}
          keyExtractor={item => item?.id?.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.flatListContentContainer}
        />
      )}
   
    </SafeAreaView>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: hp(2),
    paddingBottom: hp(4),
  },
  flatListContentContainer: {
    paddingBottom: hp(4),
  },
  headerText1: {
    fontSize: fp(2.8),
    textTransform: 'uppercase',
    color: '#FF3131',
    fontWeight: 'bold',
    marginLeft: wp(5),
    marginTop: hp(2),
  },
  headerText2: {
    fontSize: fp(1.7),
    textTransform: 'uppercase',
    color: '#5B5B5B',
    marginLeft: wp(5),
    marginVertical: hp(0.5),
  },
  grayBar: {
    height: hp(0.2),
    backgroundColor: '#D3D3D3',
    marginVertical: hp(1.7),
    marginHorizontal: wp(1),
  },
  toggleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(1),
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    marginHorizontal: wp(1),
  },
  toggleButtonActive: {
    backgroundColor: '#FF3131',
  },
  toggleButtonText: {
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  toggleActiveButtonText: {
    color: '#fff',
  },
});
