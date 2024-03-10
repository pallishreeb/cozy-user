import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default ({
  lable = '',
  source = require('../../assets/house-keeper.png'),
}) => {
  return (
    <View style={styles.categoryHeaderContainer}>
      <Image
        source={source}
        resizeMode={'stretch'}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryLabel}>{lable}</Text>
    </View>
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
