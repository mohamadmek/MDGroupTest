import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, Size} from '../../constants';

interface IProps {
  title: string;
}

const SectionHeader = ({title}: IProps) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>
        {title.replace(/^./, str => str.toUpperCase())}
      </Text>
    </View>
  );
};
export default React.memo(SectionHeader);

const styles = StyleSheet.create({
  header: {
    fontSize: Size.section,
    color: colors.white,
  },
  headerContainer: {
    backgroundColor: colors.sectionhead,
    marginVertical: 1,
    paddingLeft: 10,
    paddingVertical: 6,
  },
});
