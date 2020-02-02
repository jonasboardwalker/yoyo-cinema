// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: '4cb1eeab94f45affe2536f2c684a5c9e',
  apiSearchUrl: 'https://api.themoviedb.org/3/search/movie',
  posterUrl: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
  backdropUrl: 'https://image.tmdb.org/t/p/w1400_and_h450_face',
  movieDetailUrl: 'https://api.themoviedb.org/3/movie',
  trendingUrl: 'https://api.themoviedb.org/3/trending/movie/week'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
