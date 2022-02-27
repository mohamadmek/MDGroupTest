import {createSlice} from '@reduxjs/toolkit';
import {getBreedImages, getDogsBreeds} from '../actions';

export interface IDogsSlice {
  message: string;
  dogsBreeds: {title: string; data: string[]}[] | [];
  isLoading: boolean;
  isError: boolean;
  selectedBreed: {title: string; images: string[] | []};
  isLoadingImages: boolean;
}

const initialState: IDogsSlice = {
  dogsBreeds: [],
  isError: false,
  isLoading: false,
  isLoadingImages: false,
  message: '',
  selectedBreed: {
    title: '',
    images: [],
  },
};

export const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    search: state => {
      console.log(state);
    },
  },
  extraReducers: builder => {
    builder
      // Get All Breeds
      .addCase(getDogsBreeds.pending, state => {
        state.isLoading = true;
      })
      .addCase(getDogsBreeds.fulfilled, (state, action) => {
        const tempData = action?.payload?.message ?? [];
        const newArr = Object.keys(tempData).map(key => {
          return {title: key, data: tempData[key]};
        });
        state.isLoading = false;
        state.dogsBreeds = newArr;
      })
      .addCase(getDogsBreeds.rejected, (state, _) => {
        state.isLoading = false;
        state.isError = true;
      })
      // Get Breed Images
      .addCase(getBreedImages.pending, state => {
        state.isLoadingImages = true;
      })
      .addCase(getBreedImages.fulfilled, (state, action) => {
        state.isLoadingImages = false;
        state.selectedBreed = action.payload;
      })
      .addCase(getBreedImages.rejected, (state, _) => {
        state.isLoadingImages = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {search} = dogsSlice.actions;

export default dogsSlice.reducer;
