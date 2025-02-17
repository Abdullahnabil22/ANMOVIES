export const getMovies = async (lang: string, page: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const getMovieLogo = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();

  const englishLogos = data.logos.filter(
    (logo: { iso_639_1: string }) => logo.iso_639_1 === "en"
  );

  if (englishLogos.length > 0) {
    return `https://image.tmdb.org/t/p/original/${englishLogos[0].file_path}`;
  }

  return englishLogos.length > 0
    ? null
    : `https://image.tmdb.org/t/p/original/${data.logos[0]?.file_path}`;
};

export const getNowPlayingMovies = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};

export const getTrendingMovies = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};

export const getGenres = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};

export const getGenreMovies = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${id}`
  );
  const data = await response.json();
  return data;
};

export const getUpcomingMovies = async (lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};

export const getMovieDetails = async (id: number, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};

export const searchMovies = async (lang: string, query: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}&query=${query}`
  );
  const data = await response.json();
  return data;
};

export const getMovieRecommendations = async (id: number, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};

export const getMovieCredits = async (id: number, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};

export const getMovieSimilar = async (id: number, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};
