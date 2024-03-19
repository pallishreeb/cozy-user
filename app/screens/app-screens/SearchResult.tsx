import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import CustomHeader from '../../components/customHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import ServiceCard from '../../components/serviceCard';
import {useSearchProviders} from '../../hooks/useSearchProviders';
import Loader from '../../components/loader';

const SearchResult = ({navigation, route}) => {
  const {keyword} = route.params;
  const {providers, loading, error, fetchProviders} = useSearchProviders();

  useEffect(() => {
    // Fetch providers based on the keyword when the component mounts or the keyword changes
    fetchProviders({serviceName: keyword});
  }, [keyword]);

  const renderHeader = () => (
    <>
      <Text style={styles.headerText}>Results for {keyword}</Text>
    </>
  );
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Text>{error.message || 'Something Went Wrong!'}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
      <CustomHeader
        isNotification={true}
        onBackPress={() => {
          navigation.goBack();
        }}
        onNotificationPress={() => {
          navigation.navigate('Notification');
        }}
      />
      {providers.length === 0 ? (
        <View style={styles.serviceImageConatiner}>
          <Image
            style={styles.serviceImage}
            source={require('../../assets/not-found.png')}
          />
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  headerText: {
    fontSize: fp(1.7),
    textTransform: 'uppercase',
    color: '#333',
    fontWeight: 'bold',
    marginLeft: wp(5),
    marginVertical: hp(0.5),
  },
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
  serviceImageConatiner: {
    flex: 1, // Takes up all available space below the header
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',
  },
  serviceImage: {
    height: hp(80),
    width: wp(100),
  },
});
