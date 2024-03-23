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
import {axiosPublic} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setSignIn} from '../../redux/slices/authSlice';
import {AuthStackParamList} from '../../navigations/auth-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type SignInScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;
export default ({navigation}: SignInScreenProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
  }>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const validateForm = () => {
    let errors: {email: string | null; password: string | null} = {
      email: null,
      password: null,
    };
    // Validate email field
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
    // Set the errors and update form validity
    // Check if both errors.email and errors.password are null
    setErrors(errors);
    const isErrors = errors.email === null && errors.password === null;
    setIsFormValid(isErrors);
  };
  const handleSubmit = async () => {
    if (!isFormValid) {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
      Alert.alert('Errors', 'Form has errors. Please correct them.');
    }
    try {
      setIsLoading(true);
      const response = await axiosPublic.post(`${endpoints.LOGIN}`, {
        email,
        password,
      });
      console.log('login response', response?.data);
      dispatch(setSignIn(response?.data));
      await AsyncStorage.setItem('@auth', JSON.stringify(response?.data));
    } catch (error) {
      console.log('inside catch', error?.response);
      Alert.alert(
        'Error',
        'Login Failed ! Wrong credentials or server issue.\nPlease check your internet connect and try again later',
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
          <Text style={styles.headingText1}>{'Login to continue'}</Text>
          <Text style={styles.headingText2}>{'Welcome Back'}</Text>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.submitButtonConatiner}>
            <SubmitButton
              title={isLoading ? 'Submitting' : 'Login'}
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
    paddingTop: hp(10),
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
