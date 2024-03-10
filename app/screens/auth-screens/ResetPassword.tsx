import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
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
import Input from '../../components/input';
import SubmitButton from '../../components/submitButton';
import OtpInput from '../../components/otpInput';
import {axiosPublic} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
export default ({navigation, route}) => {
  const {email} = route.params;
  const [currentOtp, setCurrentOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{
    password: string | null;
    confirmPassword: string | null;
  }>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const validateForm = () => {
    let errors: {
      password: string | null;
      confirmPassword: string | null;
    } = {
      password: null,
      confirmPassword: null,
    };

    // Validate password field
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Confirm Password must be equals to Password';
    }
    // Set the errors and update form validity
    // Check if both errors.email and errors.password are null
    setErrors(errors);
    const isErrors =
      errors.confirmPassword === null && errors.password === null;
    setIsFormValid(isErrors);
  };
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, confirmPassword]);
  const handleSubmit = async () => {
    if (!isFormValid) {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
      Alert.alert('Errors', 'Form has errors. Please correct them.');
    }
    try {
      setIsLoading(true);
      const response = await axiosPublic.post(`${endpoints.RESET_PASSWORD}`, {
        otp: currentOtp,
        email,
        password,
      });
      Alert.alert('Info', `${response?.data?.message}`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SignIn'),
        },
      ]);
    } catch (error) {
      console.log('inside catch', error?.response);
      Alert.alert(
        'Information',
        `Reset Password Failed \nPlease try again later`,
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
          <Text style={styles.headingText1}>{'Reset Password'}</Text>
          <Text style={styles.headingText2}>
            {'Please type the verification code \nSent to your email'}
          </Text>
          <View style={styles.fieldContainer}>
            <OtpInput setCurrentOtp={setCurrentOtp} />
          </View>
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendButtonText}>Resend Code</Text>
          </TouchableOpacity>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <Input
              placeholder="*************"
              value={password}
              setValue={setPassword}
              leftIconName="lock"
              secureTextEntry={!passwordVisible}
              rightIconName={passwordVisible ? 'eye' : 'eye-slash'}
              iconRightPress={togglePasswordVisibility}
            />
            <Text style={styles.errorMSg}>{errors?.password}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <Input
              placeholder="*************"
              value={confirmPassword}
              setValue={setConfirmPassword}
              leftIconName="lock"
              secureTextEntry={!confirmPasswordVisible}
              rightIconName={confirmPasswordVisible ? 'eye' : 'eye-slash'}
              iconRightPress={toggleConfirmPasswordVisibility}
            />
            <Text style={styles.errorMSg}>{errors?.password}</Text>
          </View>
          <View style={styles.submitButtonConatiner}>
            <SubmitButton
              title={isLoading ? 'Submitting' : 'Reset'}
              onPress={handleSubmit}
              disabled={!isFormValid || isLoading}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('SignUp')}>
              Sign Up
            </Text>
          </Text>
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
    // paddingBottom: 36,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
    paddingTop: 50,
    // paddingBottom: 30,
    // marginBottom: 30,
    height: hp(90),
  },

  headingText1: {
    fontSize: 25,
    marginBottom: 8,
    marginHorizontal: 26,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FF3131',
  },
  headingText2: {
    color: '#84868A',
    // marginBottom: 20,
    marginHorizontal: 25,
    fontSize: 18, // Adjust for smaller text
    fontWeight: 'normal', // Or specify the desired weight
    textTransform: 'none', // Default, but explicitly stated for clarity
  },
  fieldContainer: {
    marginTop: 20,
    marginHorizontal: wp(6),
  },
  label: {
    color: '#5B5B5B',
    fontSize: 14,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  errorMSg: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
  forgotPasswordContainer: {
    marginVertical: 20,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: '#FF3131',
    textDecorationLine: 'none',
  },
  submitButtonConatiner: {
    marginBottom: hp(4),
    marginTop: hp(4),
  },
  footer: {
    marginTop: 'auto', // Pushes the footer to the bottom
    paddingTop: 20, // Adjust based on your design
    paddingBottom: 20, // Adjust based on your design
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
  },
  signUpText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  resendButtonText: {
    textDecorationLine: 'underline',
    color: '#FF3131',
    fontSize: fp(1.9),
  },
  resendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2),
  },
});
