import axios from "axios";

const API_KEY = "62263c19";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMoviesDatas = async (category: string) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      s: category,
      type: 'movie',
      apikey: API_KEY,
    },
  });
  return data;
}

export const fetchMoviesBySearch = async (search: string) => {
  const { data } = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${search}`)
  return data;
}
