import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IMAGE_URL} from '../../constants';
import {Provider} from '../../types';

interface ServiceCardProps {
  service: Provider;
  handleBookService: () => {};
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  handleBookService,
}) => {
  const profileImage = service?.profile_pic
    ? {
        uri: `${IMAGE_URL}/profile_pic/${service?.profile_pic}`,
      }
    : require('../../assets/user-placeholder.png');
  return (
    <View style={styles.card}>
      <Image source={profileImage} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.providerName}>{service.name}</Text>
        <Text style={styles.location}>
          {service.address},{service.city},{service.state},{service.country},
          {service.zipcode}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleBookService}>
          <Icon
            name="calendar-clock-outline"
            size={rf(2.5)}
            color={'#5B5B5B'}
          />
          <Text style={styles.buttonText}>Book Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: '#E3E3E3', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  details: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-around',
  },
  providerName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
  },
  location: {
    color: '#666',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 10,
    backgroundColor: '#E3E3E3',
    width: 130,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#5B5B5B',
    fontWeight: 'bold',
  },
});
