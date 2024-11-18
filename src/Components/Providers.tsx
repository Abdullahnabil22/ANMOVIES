"use client";

import { FavProvider } from "@/Context/fav";
import { useState, useEffect, SetStateAction } from "react";
import { Movie } from "@/objects/movies.if";
import { Series } from "@/objects/series";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<(Movie | Series)[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const handleSetFavorites = (
    newFavorites: SetStateAction<(Movie | Series)[]>
  ) => {
    setFavorites(newFavorites);
    localStorage.setItem(
      "favorites",
      JSON.stringify(
        typeof newFavorites === "function"
          ? newFavorites(favorites)
          : newFavorites
      )
    );
  };

  return (
    <FavProvider value={{ fav: favorites, setFav: handleSetFavorites }}>
      {children}
    </FavProvider>
  );
}
