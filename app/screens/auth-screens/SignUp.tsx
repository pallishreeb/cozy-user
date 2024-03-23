import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  // responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../../components/input';
import SubmitButton from '../../components/submitButton';

import {axiosPublic} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import {AuthStackParamList} from '../../navigations/auth-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type SignUpScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
export default ({navigation}: SignUpScreenProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{
    name: string | null;
    email: string | null;
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
      name: string | null;
      email: string | null;
      password: string | null;
      confirmPassword: string | null;
    } = {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
    // Validate email field
    if (!name) {
      errors.name = 'Name is required.';
    } else if (name.length < 3) {
      errors.password = 'Password must be at least 3 characters.';
    }
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }
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
      errors.email === null &&
      errors.password === null &&
      errors.confirmPassword === null &&
      errors.name === null;
    setIsFormValid(isErrors);
  };
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, confirmPassword, name]);
  const handleSubmit = async () => {
    if (!isFormValid) {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
      Alert.alert('Errors', 'Form has errors. Please correct them.');
    }
    try {
      setIsLoading(true);
      const response = await axiosPublic.post(`${endpoints.SIGN_UP}`, {
        email,
        password,
        name,
      });
      Alert.alert('Info', `${response.data.message}`, [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('VerificationCode', {
              email: email,
              previousRoute: 'SignUp',
            }),
        },
      ]);
    } catch (error: Error | any) {
      console.log('inside catch', error.response);
      Alert.alert('Information', `Sign Up failed \nPlease try again later`);
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
          <Text style={styles.headingText1}>{'Register'}</Text>
          <Text style={styles.headingText2}>{'Create a New Account'}</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            <Input
              placeholder="johndoe"
              leftIconName="user"
              value={name}
              setValue={setName}
            />
            <Text style={styles.errorMSg}>{errors?.name}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <Input
              placeholder="johndoe@gmail.com"
              keyboardType="email-address"
              autoCompleteType="email"
              leftIconName="envelope"
              value={email}
              setValue={setEmail}
            />
            <Text style={styles.errorMSg}>{errors?.email}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <Input
              placeholder="*************"
              value={password}
              setValue={setPassword}
              leftIconName="lock"
              secureTextEntry={!passwordVisible}
              isRightIcon={true}
              rightIconName={passwordVisible ? 'eye' : 'eye-slash'}
              iconRightPress={togglePasswordVisibility}
            />
            <Text style={styles.errorMSg}>{errors?.password}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}> Confirm Password</Text>
            <Input
              placeholder="*************"
              value={confirmPassword}
              setValue={setConfirmPassword}
              leftIconName="lock"
              isRightIcon={true}
              secureTextEntry={!confirmPasswordVisible}
              rightIconName={confirmPasswordVisible ? 'eye' : 'eye-slash'}
              iconRightPress={toggleConfirmPasswordVisibility}
            />
            <Text style={styles.errorMSg}>{errors?.confirmPassword}</Text>
          </View>
          <View style={styles.submitButtonConatiner}>
            <SubmitButton
              title={isLoading ? 'Submitting' : 'Sign Up'}
              onPress={handleSubmit}
              disabled={!isFormValid || isLoading}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('SignIn')}>
              Sign In
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
    paddingTop: hp(4),
    paddingBottom: hp(4),
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
    marginBottom: 30,
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
    // marginBottom: 8,
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
  oauthButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderColor: '#D0D0D0',
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 16,
    marginBottom: 18,
    marginHorizontal: 25,
  },
  oauthButtonText: {
    color: '#595959',
    fontSize: 16,
  },
  oauthLogo: {
    width: 20,
    height: 20,
    marginRight: 12,
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
});
