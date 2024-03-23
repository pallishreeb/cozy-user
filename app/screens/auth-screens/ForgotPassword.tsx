import React, {useEffect, useState} from 'react';
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
import Input from '../../components/input';
import SubmitButton from '../../components/submitButton';
import {axiosPublic} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import {AuthStackParamList} from '../../navigations/auth-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;
export default ({navigation}: ForgotPasswordScreenProps) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{
    email: string | null;
  }>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const validateForm = () => {
    let errors: {email: string | null} = {
      email: null,
    };
    // Validate email field
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    setErrors(errors);
    const isErrors = errors.email === null;
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
      const response = await axiosPublic.post(`${endpoints.FORGOT_PASSWORD}`, {
        email,
      });
      console.log('login response', response?.data);
      Alert.alert('Info', `${response?.data?.message}`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ResetPassword', {email}),
        },
      ]);
    } catch (error: Error | any) {
      console.log('inside catch', error?.response);
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
            <Text style={styles.mainHeadingText}>{'Forgot Password'}</Text>
          </View>
          <Text style={styles.subHeadingText1}>
            {'Did someone forgot their password'}
          </Text>
          <ImageBackground
            source={require('../../assets/auth-image.png')}
            resizeMode={'stretch'}
            style={styles.illustrationImage}>
            <View style={styles.overlayView} />
          </ImageBackground>
          <Text style={styles.subHeadingText2}>
            {
              'Just enter the email address you have used to register\nwith us and we’ll send you a reset link!'
            }
          </Text>
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

          <SubmitButton
            title={isLoading ? 'Submitting' : 'Submit'}
            onPress={handleSubmit}
            disabled={!isFormValid || isLoading}
          />
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
  subHeadingText2: {
    color: '#84868A',
    fontSize: 14,
    marginBottom: 10,
    marginHorizontal: 38,
    width: 354,
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
  errorMSg: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
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
});
