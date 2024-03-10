import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/header';
import CategoryCard from '../../components/categoryCard';
export default ({navigation}) => {
  let handleNavigation = () => {
    navigation.navigate('Notification');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header handleNavigation={handleNavigation} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <View style={styles.categoryHeaderContainer}>
          <Text style={[styles.categoryTitle]}>{'Top Categories'}</Text>
          <Text
            style={{
              color: '#F43131',
              fontSize: 14,
            }}>
            {'See All'}
          </Text>
        </View>
        <View style={styles.categoryHeaderContainer}>
          <CategoryCard
            lable="House keeper"
            source={require('../../assets/house-keeper.png')}
          />
          <CategoryCard
            lable="Gardeners"
            source={require('../../assets/gardener.png')}
          />
          <CategoryCard
            lable="Divers"
            source={require('../../assets/drivers.png')}
          />
        </View>

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#FC5A54', '#E6E6E6']}
          style={styles.linearGradientStyle}>
          <View style={styles.categoryHeaderContainer}>
            <Text style={[styles.categoryTitle]}>{'House & Home'}</Text>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
              }}>
              {'See All'}
            </Text>
          </View>
          <View style={styles.categoryHeaderContainer}>
            <CategoryCard
              lable="Gardening"
              source={require('../../assets/gardening.png')}
            />
            <CategoryCard
              lable="Painting Services"
              source={require('../../assets/painting-services.png')}
            />
            <CategoryCard
              lable="House Cleaning"
              source={require('../../assets/house-cleaning.png')}
            />
          </View>
        </LinearGradient>
        <View style={styles.categoryHeaderContainer}>
          <Text style={[styles.categoryTitle]}>{'Health'}</Text>
          <Text
            style={{
              color: '#F43131',
              fontSize: 14,
            }}>
            {'See All'}
          </Text>
        </View>
        <View style={styles.categoryHeaderContainer}>
          <CategoryCard
            lable="Personal Trainers"
            source={require('../../assets/personal-trainers.png')}
          />
          <CategoryCard
            lable="Message Therapy"
            source={require('../../assets/massage-therapy.png')}
          />
          <CategoryCard
            lable="Yoga Classes"
            source={require('../../assets/yoga-classes.png')}
          />
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#E6E6E6', '#FC5A54']}
          style={styles.linearGradientStyle}>
          <View style={styles.categoryHeaderContainer}>
            <Text style={[styles.categoryTitle]}>
              {'Events & Entertainers'}
            </Text>
            <Text
              style={{
                color: '#505050',
                fontSize: 14,
              }}>
              {'See All'}
            </Text>
          </View>
          <View style={styles.categoryHeaderContainer}>
            <CategoryCard
              lable="Gardening"
              source={require('../../assets/gardening.png')}
            />
            <CategoryCard
              lable="Painting Services"
              source={require('../../assets/painting-services.png')}
            />
            <CategoryCard
              lable="House Cleaning"
              source={require('../../assets/house-cleaning.png')}
            />
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  categoryHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  categoryImage: {
    borderRadius: 14,
    width: 123,
    height: 97,
  },
  linearGradientStyle: {
    paddingTop: 20,
    paddingBottom: 13,
  },
  categoryTitle: {
    fontWeight: 'bold',
    color: '#6D5C38',
    // '#505050'
    fontSize: 20,
    textTransform: 'uppercase',
  },
});
