import { Movie } from "@/objects/movies.if";
import { Series } from "@/objects/series";
import { createContext } from "react";

type FavContextType = {
  fav: (Movie | Series)[];
  setFav: React.Dispatch<React.SetStateAction<(Movie | Series)[]>>;
};

export const favContext = createContext<FavContextType>({
  fav: [],
  setFav: () => {},
});

export const FavProvider = favContext.Provider;
