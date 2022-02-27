import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {colors, Size} from '../constants';

interface Iprops {
  keyboardType?: any;
  multiline?: boolean | undefined;
  value: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  onChangeText: (value: React.SetStateAction<string>) => void;
}

const FilterInput = ({
  keyboardType,
  multiline,
  secureTextEntry = false,
  value,
  placeholder,
  onChangeText,
}: Iprops) => {
  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.inputContainer}
        keyboardType={keyboardType}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        value={value}
        selectionColor={colors.blue}
        placeholder={placeholder}
        placeholderTextColor={'#000'}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default FilterInput;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    height: 42,
    borderRadius: 7,
  },
  inputContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    fontSize: Size.section,
    // So text is not cutted on Top in Android
    paddingTop: 0,
    paddingBottom: 0,
  },
});
