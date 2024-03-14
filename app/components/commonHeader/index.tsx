import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {remove} from '../../utils/storage';
import {setSignOut} from '../../redux/slices/authSlice';
export default ({handleNavigation = () => {}}) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF3131',
    paddingTop: 7,
    paddingBottom: 35,
  },
  topHeaderConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 21,
  },
});
