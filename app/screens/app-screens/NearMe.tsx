import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import Header from '../../components/homeHeader';
import ServiceCard from '../../components/serviceCard';
import useProfileData from '../../hooks/useProfileData';
import Loader from '../../components/loader';
import {useSearchProviders} from '../../hooks/useSearchProviders';

const NearMe = ({navigation}) => {
  const {
    profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useProfileData();
  const [zipcode, setZipcode] = useState('');
  const [searchZipcode, setSearchZipcode] = useState('');
  const [manualSearchInitiated, setManualSearchInitiated] = useState(false);

  const {providers, loading, error, fetchProviders} = useSearchProviders(); // Adjusted to include a fetch method

  useEffect(() => {
    // If there's profile data and no manual search has been initiated, use the profile's zipcode
    if (profileData?.zipcode && !manualSearchInitiated) {
      setSearchZipcode(profileData.zipcode);
      fetchProviders({zipcode: profileData.zipcode});
    }
  }, [profileData, manualSearchInitiated]);
  if (profileLoading || loading) {
    return <Loader />;
  }
  if (profileError || error) {
    return <Text>{profileError || error?.message}</Text>;
  }
  const renderHeader = () => (
    <Text style={styles.headerText2}>Near You ({providers.length})</Text>
  );
  const searchResults = () => {
    setManualSearchInitiated(true); // Indicate that a manual search has been initiated
    setSearchZipcode(zipcode); // Update the searchZipcode to trigger the search
    fetchProviders({zipcode});
  };
  return (
    <SafeAreaView style={styles.container}>
      {providers.length === 0 ? (
        <ScrollView>
          <Header
            handleSearch={text => {
              setZipcode(text as string);
            }}
            onPressSearch={searchResults}
            handleNavigation={() => {
              navigation.navigate('Notification');
            }}
            screenType="nearMe"
            label="Your location"
            placeholder="Enter Your Pin/Zip Code"
          />
          <View style={styles.serviceImageConatiner}>
            <Image
              style={styles.serviceImage}
              source={require('../../assets/not-found.png')}
            />
          </View>
        </ScrollView>
      ) : (
        <>
          <Header
            handleSearch={text => {
              setZipcode(text as string);
            }}
            onPressSearch={searchResults}
            handleNavigation={() => {
              navigation.navigate('Notification');
            }}
            screenType="nearMe"
            label="Your location"
            placeholder="Enter Your Pin/Zip Code"
          />
          <FlatList
            data={providers}
            renderItem={({item}) => (
              <ServiceCard
                service={item}
                handleBookService={() =>
                  navigation.navigate('ServiceDetails', {providerId: item?.id})
                }
              />
            )}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={renderHeader}
            // Add padding at the bottom to ensure nothing is cut off
            contentContainerStyle={styles.flatListContentContainer}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default NearMe;

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

  headerText2: {
    fontSize: fp(1.7),
    textTransform: 'uppercase',
    color: '#333',
    fontWeight: 'bold',
    marginLeft: wp(5),
    marginVertical: hp(0.5),
  },
  serviceImageConatiner: {
    flex: 1, // Takes up all available space below the header
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',
  },
  serviceImage: {
    height: hp(60),
    width: wp(90),
  },
});
