const paths = {
  HOME: '/',
  FILMS: '/films',
  TV: '/tv',
  MOVIES: '/movies',
  MOVIES_ID: (id, type) => `/movies/${id}/${type}`,
};
export default paths;
