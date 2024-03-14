import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {remove} from '../../utils/storage';
import {setSignOut} from '../../redux/slices/authSlice';
export default ({handleNavigation = () => {}, }) => {
  const dispatch = useDispatch();
  let handleSignOut = () => {
    remove('@auth');
    dispatch(setSignOut());
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#FF3131'} barStyle="light-content" />
      <View style={styles.topHeaderConatiner}>
        <Icon
          name="sign-out"
          size={25}
          color={'white'}
          onPress={handleSignOut}
          style={{alignSelf: 'center' }}
        />
        <Image
          source={require('../../assets/header-image.png')}
          resizeMode={'stretch'}
          style={{
            width: 70,
            height: 32,
          }}
        />
        <Icon
          name="bell"
          size={25}
          color={'white'}
          onPress={handleNavigation}
        />
      </View>
      <View style={styles.whiteBar}></View>
      <Text style={styles.headerText}>{'Find and book best service'}</Text>
      <View style={styles.bottomHeaderConatiner}>
        <Icon
          name="search"
          size={20}
          style={{
            marginRight: 16,
          }}
        />
        <TextInput
          placeholder="Find and book best service"
          style={{
            color: '#6D5C38',
            fontSize: 16,
            flex: 1,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF3131',
    paddingTop: 7,
    paddingBottom: 35,
    marginBottom: 17,
  },
  topHeaderConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 9,
    marginHorizontal: 21,
  },
  whiteBar: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    width: 500,
    height: 0.5,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  bottomHeaderConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 21,
    marginHorizontal: 21,
  },
});
