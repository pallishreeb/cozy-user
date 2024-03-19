import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default ({
  label = '',
  source = require('../../assets/house-keeper.png'),
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={styles.categoryHeaderContainer} onPress={onPress}>
      <Image
        source={source}
        resizeMode={'stretch'}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryHeaderContainer: {
    alignItems: 'center',
  },
  categoryImage: {
    borderRadius: 14,
    width: 123,
    height: 97,
  },
  categoryLabel: {
    color: '#4B4B4B',
    fontSize: 12,
    marginRight: 4,
    flex: 1,
  },
});
