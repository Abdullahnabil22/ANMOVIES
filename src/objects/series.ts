import { Genre } from "./movies.if";

export interface Series {
  type: "series";
  id: number;
  name: string;
  poster_path: string;
  overview: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  status: string;
  budget: number;
  runtime: number;
  episode_run_time: number[];
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Genre[];
  seasons: Season[];
  networks: Network[];
}

export interface Cast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface Season {
  id: number;
  name: string;
  episode_count: number;
  poster_path: string;
  season_number: number;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string;
}
