import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import CustomHeader from '../../components/customHeader';

const ThankYou = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MyTabs', {screen: 'Home'}); // Adjust this to your home page route
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNotification={true}
        title="Thank You"
        onBackPress={() => navigation.navigate('MyTabs')}
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      <View style={styles.thankYouContainer}>
        <View style={styles.content}>
          <Image
            source={require('../../assets/thank-you.png')} // Update the path to your Thank You image
            style={styles.image}
          />
          <Text style={styles.successText}>Your Booking was Successful</Text>
          <Text
            style={styles.redirectText}
            onPress={() =>
              navigation.navigate('MyTabs', {screen: 'Appointment'})
            }>
            {/* Update this to your My Bookings route */}
            You will be redirected to the home page shortly or{' '}
            <Text style={styles.clickHereText}>click here</Text> to go to My
            Bookings.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MyTabs', {screen: 'Home'})}>
            {/* Adjust this to your home page route */}
            <Text style={styles.buttonText}>Go To Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ThankYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thankYouContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200, // Adjust according to your image's size
    height: 200, // Adjust according to your image's size
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  redirectText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  clickHereText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#007BFF', // Use your app's theme color
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
