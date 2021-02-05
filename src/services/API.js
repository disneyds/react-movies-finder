import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c1e53addfa80b01d9b5d3a3d23b4febe';

export async function requestTrendingMovies(page = 1) {
  const { data } = await axios.get(
    `${BASE_URL}/trending/all/week?api_key=${API_KEY}&page=${page}&language=ru-RU&include_image_language=en`,
  );
  return data;
}

export async function requestDetails(movieId, type = 'movie') {
  const { data } = await axios.get(
    `${BASE_URL}/${type}/${movieId}?api_key=${API_KEY}&language=ru-RU&append_to_response=videos&include_image_language=en`,
  );

  return data;
}

export async function requestLatestMovies(page = 1) {
  const { data } = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=ru-RU&include_image_language=en`,
  );
  return data;
}

export async function requestTV(page = 1) {
  const { data } = await axios.get(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}&language=ru-RU&include_image_language=en`,
  );
  return data;
}

export async function requestCredits(movieId) {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=ru-RU`,
  );

  return data;
}
export async function requestReviews(movieId) {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`,
  );

  return data;
}
