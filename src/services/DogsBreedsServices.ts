import axios from 'axios';

const API_URL = 'https://dog.ceo/api';

const getDogsBreeds = async () => {
  const response = await axios.get(API_URL + '/breeds/list/all');
  return response.data;
};

const getBreedImages = async (breed: string, subBreed: string) => {
  const response = await axios.get(
    `${API_URL}/breed/${breed}/${subBreed}/images/random/2`,
  );
  return response.data;
};

export const dogsBreedsService = {
  getDogsBreeds,
  getBreedImages,
};
