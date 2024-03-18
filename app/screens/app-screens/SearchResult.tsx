import {FlatList, StyleSheet, Text} from 'react-native';
import React from 'react';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import CustomHeader from '../../components/customHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import ServiceCard from '../../components/serviceCard';
// Sample appointments array including both past and future dates
const services = [
  {
    id: 1,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'John Doe',
    location: '1000  LOS PALOS ST LOS ANGELES CA 90023-2326 USA',
    date: '2024-03-20',
    time: '2:00 PM',
  },
  {
    id: 2,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'Jane Smith',
    location: 'L1000  LOS PALOS ST LOS ANGELES CA 90023-2326 USA',
    date: '2024-03-22',
    time: '4:00 PM',
  },
  // Assuming the current date is close to the dates above, add some past appointments
  {
    id: 3,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'Michael Brown',
    location: '1000  LOS PALOS ST LOS ANGELES CA 90023-2326 USA',
    date: '2023-12-15',
    time: '1:00 PM',
  },
  {
    id: 4,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'Sarah Connor',
    location: '1000  LOS PALOS ST LOS ANGELES CA 90023-2326 USA',
    date: '2023-11-10',
    time: '3:30 PM',
  },
  {
    id: 5,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'Sarah Gregor',
    location: '1000  LOS PALOS ST LOS ANGELES CA 90023-2326 USA',
    date: '2023-11-10',
    time: '3:30 PM',
  },
  {
    id: 6,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'Micheal Greg',
    location: '1000  LOS PALOS ST LOS ANGELES CA 90023-2326 USA',
    date: '2023-11-10',
    time: '3:30 PM',
  },
];
const SearchResult = ({navigation, route}) => {
  const {keyword} = route.params;
  const renderHeader = () => (
    <>
      <Text style={styles.headerText}>Results for {keyword}</Text>
    </>
  );
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
      <FlatList
        data={services}
        renderItem={({item}) => (
          <ServiceCard
            service={item}
            handleBookService={() => navigation.navigate('ServiceDetails')}
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        // Add padding at the bottom to ensure nothing is cut off
        contentContainerStyle={styles.flatListContentContainer}
      />
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
});
