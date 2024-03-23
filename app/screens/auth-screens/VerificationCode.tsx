import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import SubmitButton from '../../components/submitButton';
import OtpInput from '../../components/otpInput';
import {axiosPublic} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import {AuthStackParamList} from '../../navigations/auth-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type VerificationCodeScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'VerificationCode'
>;
export default ({navigation, route}: VerificationCodeScreenProps) => {
  const {email, previousRoute} = route.params;
  const [currentOtp, setCurrentOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPublic.post(`${endpoints.VERIFY_OTP}`, {
        email,
        otp: currentOtp,
      });
      Alert.alert('Info', `Verification Successfull`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SignIn'),
        },
      ]);
    } catch (error: Error | any) {
      console.log('inside catch', error?.response);
      Alert.alert(
        'Information',
        `Verification Failed Due To ${error?.response.data.error}  \nPlease try again later`,
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar backgroundColor={'#FF3131'} barStyle="light-content" />
        <View style={styles.formContainer}>
          <View style={styles.mainHeading}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <AntdIcon name="left" size={25} />
            </TouchableOpacity>
            <Text style={styles.mainHeadingText}>{'Verification Code'}</Text>
          </View>
          <Text style={styles.subHeadingText1}>
            {`Please type the verification code\nsend to  ${email}`}
          </Text>
          <ImageBackground
            source={require('../../assets/auth-image.png')}
            resizeMode={'stretch'}
            style={styles.illustrationImage}>
            <View style={styles.overlayView} />
          </ImageBackground>

          <View style={styles.fieldContainer}>
            <OtpInput setCurrentOtp={setCurrentOtp} />
          </View>
          <View style={styles.submitButtonConatiner}>
            <SubmitButton
              title={isLoading ? 'Verifing' : 'Verify'}
              onPress={handleVerifyOtp}
              disabled={isLoading}
            />
          </View>
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendButtonText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#FF3131',
  },
  illustrationImage: {
    paddingHorizontal: 2,
    marginBottom: 15,
    height: 164,
    width: 160,
    alignSelf: 'center',
  },
  overlayView: {
    width: 160,
    height: 164,
    borderRadius: fp(30),
    position: 'absolute',
    backgroundColor: '#FF3130',
    opacity: 0.8,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
    paddingTop: 80,
    paddingBottom: 50,
    marginBottom: 30,
    height: hp(90),
  },
  mainHeading: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 11,
    marginHorizontal: 25,
    gap: 20,
  },
  mainHeadingText: {
    color: '#FF3131',
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subHeadingText1: {
    color: '#84868A',
    fontSize: 16,
    marginBottom: 25,
    marginHorizontal: 35,
  },

  fieldContainer: {
    marginVertical: 20,
    marginHorizontal: wp(6),
  },
  label: {
    color: '#5B5B5B',
    fontSize: 14,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  submitButtonConatiner: {
    marginBottom: hp(4),
    marginTop: hp(4),
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#FF3131',
    borderRadius: 5,
    padding: 15,
    marginHorizontal: wp(6),
    shadowColor: '#FF31311A',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  submmitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButtonText: {
    textDecorationLine: 'underline',
    color: '#FF3131',
    fontSize: fp(1.9),
  },
  resendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2.5),
  },
});
