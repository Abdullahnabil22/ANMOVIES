export const getSeries = async (lang: string, page: number = 1) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const searchSeries = async (lang: string, query: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}search/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}&query=${query}`
  );
  const data = await response.json();
  return data;
};
export const getTVSeriesDetails = async (id: number, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};

export const getTVSeriesLogo = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}tv/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  return data.logos?.[0]?.file_path
    ? `https://image.tmdb.org/t/p/original${data.logos[0].file_path}`
    : null;
};

export const getTVSeriesCredits = async (id: number, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}tv/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};

export const getTVSeriesRecommendations = async (id: number, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}tv/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};

export const getTVSeriesSimilar = async (id: number, lang: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}tv/${id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=${lang}`
  );
  const data = await response.json();
  return data;
};
