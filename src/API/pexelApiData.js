import { createClient } from 'pexels';

const API_KEY =
 'jJaa1j3Eq7fCWH0hLFV533Us2zRX9EyjI5laDtXNYtTweuyPNvtqQOzM';

// export const prexelApiData = (
//  searchQuery,
//  page
// ) => {
//  const BASE_URL =
//   'https://pixabay.com/api/';

//  return axios.get(
//   `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//  );
// };

export const getPrexelApiData =
 createClient(API_KEY);
const query = 'pokemon';

getPrexelApiData.photos
 .search({ query, per_page: 1 })
 .then((photos) =>
  console.log(`photos: `, photos)
 );
