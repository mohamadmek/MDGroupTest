import {View, StyleSheet, SectionList} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {getDogsBreeds} from '../../actions';
import {homeScreenPropNav} from '../../navigations/Main';
import {useAppDispatch, useAppSelector} from '../../Hooks';
import {colors} from '../../constants';
import SectionItem from './SectionItem';
import SectionHeader from './SectionHeader';
import {FilterInput, LoadingView} from '../../components';

const MainScreen = ({isSorted}: {isSorted: boolean}) => {
  const navigation = useNavigation<homeScreenPropNav>();
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState('');

  let {dogsBreeds, isLoading} = useAppSelector(state => state.dogs);

  useEffect(() => {
    dispatch(getDogsBreeds());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // To filter on each input
  dogsBreeds = dogsBreeds.filter(i =>
    i.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // To not render on Change the random images
  useMemo(() => {
    if (isSorted) {
      dogsBreeds.reverse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSorted]);

  const renderHeader = ({section}: {section: any}) => {
    return <SectionHeader title={section.title} />;
  };

  const renderItem = ({item, section}: {item: any; section: any}) => {
    return (
      <SectionItem
        navigation={navigation}
        breed={section.title}
        subBreed={item}
      />
    );
  };

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.pd10}>
        <FilterInput
          placeholder="Filter Breeds"
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>
      <SectionList
        contentContainerStyle={styles.pdB20}
        removeClippedSubviews={false}
        maxToRenderPerBatch={20}
        initialNumToRender={10}
        sections={dogsBreeds}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={renderHeader}
        renderItem={renderItem}
      />
    </View>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.backgroundColor},
  pd10: {padding: 10},
  pdB20: {paddingBottom: 20},
});
