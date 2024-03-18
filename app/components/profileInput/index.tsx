import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

type Props = {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  label: string;
  multiline?: boolean;
};

const ProfileInput = ({
  value,
  onChangeText,
  placeholder,
  label,
  multiline = false,
}: Props): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  // Determine whether to show the placeholder
  const showPlaceholder = !isFocused && !value;

  useEffect(() => {
    // If there's a value, ensure placeholder is not shown
    if (value) setIsFocused(true);
  }, [value]);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        placeholder={showPlaceholder ? placeholder : ''}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default ProfileInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: rw(2.5),
    marginBottom: rh(1),
    borderRadius: rw(1.2),
    width: '100%',
    textAlignVertical: 'top', // Ensures text starts from top
  },
  multilineInput: {
    paddingTop: rw(2.5), // Adjust padding for multiline
  },
  label: {
    fontSize: rf(2),
    color: '#000',
    marginBottom: rh(1),
    marginLeft: rw(2),
  },
});
