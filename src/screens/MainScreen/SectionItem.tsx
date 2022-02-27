import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {homeScreenPropNav} from '../../navigations/Main';
import {colors, Size} from '../../constants';

interface IProps {
  breed: string;
  subBreed: string;
  navigation: homeScreenPropNav;
}

const SectionItem = ({breed, subBreed, navigation}: IProps) => {
  // Capitalize first letter
  const capiSubBreed = subBreed.replace(/^./, str => str.toUpperCase());

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation?.navigate('DetailsScreen', {
          breed: breed,
          subBreed: subBreed,
        })
      }>
      <View style={styles.item}>
        <Text style={styles.title}>{capiSubBreed}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default React.memo(SectionItem);

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.sectionitem,
    paddingVertical: 6,
    marginVertical: 1,
    paddingLeft: 20,
  },

  title: {
    fontSize: Size.section,
    color: colors.white,
  },
});
