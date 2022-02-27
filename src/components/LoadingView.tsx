import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../constants';

export default function LoadingView() {
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator
        style={styles.indicator}
        color={colors.blue}
        size="large"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {},
});
