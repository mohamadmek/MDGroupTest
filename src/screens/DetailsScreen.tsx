import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useRoute} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../Hooks';
import {getBreedImages} from '../actions';
import {DetailsScreenPropNav} from '../navigations/Main';
import {LoadingView} from '../components';
import {colors} from '../constants';

const DetailsScreen = () => {
  const route = useRoute<DetailsScreenPropNav>();
  const dispatch = useAppDispatch();
  const {selectedBreed, isLoadingImages} = useAppSelector(state => state.dogs);
  const {breed, subBreed} = route.params;

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // If Checking the same subBreed don't call the API
    if (subBreed !== selectedBreed.title) {
      dispatch(getBreedImages({breed, subBreed}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getBreedImages({breed, subBreed})).then(() => {
      FastImage.clearMemoryCache();
      setRefreshing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}: {item: string}) => (
    // We can add a Skeleton or whatever deign while the image is loading
    <View style={styles.mainContainer}>
      <ActivityIndicator color={'#fff'} />
      <FastImage
        style={styles.image}
        source={{
          uri: item,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );

  if (isLoadingImages) {
    return <LoadingView />;
  }

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={selectedBreed.images}
        renderItem={renderItem}
      />
    </View>
  );
};
export default DetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    width: '70%',
    height: 250,
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: colors.blue,
    justifyContent: 'center',
  },
  image: {width: '100%', height: 250, position: 'absolute', zIndex: 99},
});
