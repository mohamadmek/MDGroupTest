import {createAsyncThunk} from '@reduxjs/toolkit';
import {dogsBreedsService} from '../services';
// import {RootState} from '../Store';

// Get dogs breeds
export const getDogsBreeds = createAsyncThunk(
  'dogs/getAll',
  async (_, thunkAPI) => {
    try {
      return await dogsBreedsService.getDogsBreeds();
    } catch (error) {
      const message = 'Something went wrong with getAllBreeds';
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get breed images
export const getBreedImages = createAsyncThunk(
  'dogs/getBreedImages',
  async ({breed, subBreed}: {breed: string; subBreed: string}, thunkAPI) => {
    try {
      const data = await dogsBreedsService.getBreedImages(breed, subBreed);

      return {
        title: subBreed,
        images: data.message,
      };
    } catch (error) {
      const message = 'Something went wrong with getAllBreeds';
      return thunkAPI.rejectWithValue(message);
    }
  },
);
