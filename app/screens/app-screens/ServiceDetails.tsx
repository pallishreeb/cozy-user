import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import CustomHeader from '../../components/customHeader';
import {useProviderDetails} from '../../hooks/useProviderDetails';
import Loader from '../../components/loader';
import {IMAGE_URL} from '../../constants';
const ServiceDetails = ({navigation, route}) => {
  const {providerId} = route.params;
  const {provider, loading, error} = useProviderDetails(providerId);
  // console.log(provider, 'provider details');
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  const fullAddress = `${provider?.address || ''}, ${provider?.city}, ${
    provider?.state
  }, ${provider?.country}, ${provider?.zipcode}`;
  const serviceName = provider?.service?.name || 'N/A';
  const categoryName = provider?.service?.category?.name || 'N/A';
  const providerProfilePic = provider?.profile_pic
    ? `${IMAGE_URL}/profile_pic/${provider?.profile_pic}`
    : 'https://via.placeholder.com/150';
  const serviceImages = provider?.service?.images;
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        isNotification={true}
        onBackPress={() => navigation.goBack()}
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.detailsContainer}>
          <Image
            source={{uri: providerProfilePic}}
            style={styles.serviceImage}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{provider?.name}</Text>
            <Text style={styles.address}>{fullAddress}</Text>
            <Text style={styles.phone}>{provider?.mobile_number}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                // onPress={() => {
                //   navigation.navigate('BookService');
                // }}
              >
                <Icon name="calendar-clock-outline" size={24} color={'white'} />
                <Text style={styles.buttonText}>Book Service</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.chatButton]}
                // onPress={() => {
                //   navigation.navigate('Chat');
                // }}
              >
                <Icon name="android-messages" size={24} color={'white'} />
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.simpleDottedLine} />
        {/* Enhanced Additional Details */}
        <View style={styles.additionalDetails}>
          <DetailCard
            icon="briefcase-outline"
            title="Experience"
            value={
              provider?.experience ? `${provider?.experience} years` : 'N/A'
            }
          />
          <DetailCard
            icon="cash"
            title="Rate"
            value={provider?.rate ? `$${provider?.rate}` : 'N/A'}
          />
          <DetailCard
            icon="format-list-bulleted"
            title="Service"
            value={serviceName || 'N/A'}
          />
          <DetailCard
            icon="account-group-outline"
            title="Category"
            value={categoryName || 'N/A'}
          />
          {provider?.specialization && (
            <>
              <SubHeading text="Specialization" />
              <Text style={styles.cardValue}>
                {provider?.specialization! || 'N/A'}
              </Text>
            </>
          )}

          {provider?.skills && (
            <>
              <SubHeading text="Skills" />
              {provider?.skills.split(',').map((skill, index) => (
                <ListItem key={index} text={skill.trim()} />
              ))}
            </>
          )}
          <FlatList
            data={serviceImages}
            renderItem={({item}) => (
              <Image
                source={{uri: `${IMAGE_URL}${item}`}}
                style={styles.serviceImage}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Component for rendering detail cards
const DetailCard: React.FC<{icon: string; title: string; value: string}> = ({
  icon,
  title,
  value,
}) => (
  <View style={styles.detailCard}>
    <Icon name={icon} size={24} style={styles.cardIcon} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  </View>
);

// Component for subheadings
const SubHeading: React.FC<{text: string}> = ({text}) => (
  <Text style={styles.subHeading}>{text}</Text>
);

// Component for list items
const ListItem: React.FC<{text: string}> = ({text}) => (
  <View style={styles.listItem}>
    <Icon name="chevron-right" size={20} style={styles.listIcon} />
    <Text style={styles.listText}>{text}</Text>
  </View>
);

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    padding: responsiveWidth(4),
  },
  serviceImage: {
    width: responsiveWidth(30), // 30% of screen width
    height: responsiveWidth(30), // Square aspect ratio
    marginRight: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  address: {
    fontSize: responsiveFontSize(1.8),
  },
  phone: {
    fontSize: responsiveFontSize(1.8),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#FF3131',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2.5),
    borderRadius: responsiveWidth(1.5),
  },
  chatButton: {
    backgroundColor: '#3F3F3F', // Different color for the chat button
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.8),
  },
  dottedLine: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: responsiveHeight(2),
  },
  simpleDottedLine: {
    height: 1,
    backgroundColor: 'gray',
    width: '95%',
    alignSelf: 'center',
    marginVertical: responsiveHeight(2),
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  additionalDetails: {
    paddingHorizontal: responsiveWidth(4),
  },
  detailCard: {
    flexDirection: 'row',
    // padding: responsiveWidth(4),
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: responsiveHeight(1),
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: responsiveWidth(4),
  },
  cardTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: responsiveFontSize(2),
  },
  subHeading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(0.5),
  },
  listIcon: {
    marginRight: responsiveWidth(2),
  },
  listText: {
    fontSize: responsiveFontSize(2),
  },
});
