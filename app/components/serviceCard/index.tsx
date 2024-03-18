import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Define TypeScript interfaces for props
interface Service {
  providerImage: string;
  providerName: string;
  location: string;
}

interface ServiceCardProps {
  service: Service;
  handleBookService: () => {};
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  handleBookService,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: service.providerImage}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.providerName}>{service.providerName}</Text>
        <Text style={styles.location}>{service.location}</Text>
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
    width: 130,
    height: 100,
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
