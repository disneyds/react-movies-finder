import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c1e53addfa80b01d9b5d3a3d23b4febe';

export async function requestTrendingMovies(page = 1) {
  const { data } = await axios.get(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}&page=${page}&language=ru-RU`,
  );
  return data;
}

export async function requestDetails(movieId) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ru-RU`,
  );

  return data;
}
