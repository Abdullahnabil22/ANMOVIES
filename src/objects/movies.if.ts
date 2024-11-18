export interface Movie {
  type: "movie";
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres: {
    id: number;
    name: string;
  }[];
  status: string;
  budget: number;
  runtime: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}
