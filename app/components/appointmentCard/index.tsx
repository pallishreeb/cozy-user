import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {IMAGE_URL} from '../../constants';
import {Appointment} from '../../types';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface AppointmentCardProps {
  appointment: Appointment;
  onEdit?: () => void;
  onCancel?: () => void;
  onChat?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onEdit,
  onCancel,
  onChat,
}) => {
  const providerProfilePic = appointment?.service?.images
    ? `${IMAGE_URL}${appointment?.service?.images[0]}`
    : 'https://via.placeholder.com/150';
  return (
    <View style={styles.card}>
      <Image source={{uri: providerProfilePic}} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.providerName}>{appointment.provider.name}</Text>
          {appointment.status === 'pending' && (
            <TouchableOpacity onPress={onEdit} style={styles.editIconContainer}>
              <Icon name="edit" size={24} color="#5B5B5B" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.location}>{appointment.address}</Text>
        <View style={styles.dateTimeRow}>
          <Text>{appointment.booking_date}</Text>
          <Text>{format(appointment.booking_time, 'p')}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          {appointment.status === 'cancelled' ? (
            <TouchableOpacity style={styles.button} disabled>
              <Text style={styles.buttonText}>Cancelled</Text>
            </TouchableOpacity>
          ) : appointment.status === 'completed' ? (
            <TouchableOpacity style={styles.button} disabled>
              <Text style={styles.buttonText}>Completed</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={onChat}>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: '#E3E3E3', // Border color
    borderWidth: 2, // Border width
    borderRadius: 5,
  },
  image: {
    width: 130,
    height: 140,
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
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#D7D7D7',
  },
  button: {
    backgroundColor: '#E3E3E3',
    // width: 120,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#5B5B5B',
    fontWeight: 'bold',
  },
  editIconContainer: {
    // Add styles for the edit icon container if necessary
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
