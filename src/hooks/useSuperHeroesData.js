import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // Keep data fresh in 5 seconds
    staleTime: 5000,

    // refetch data every 2 seconds (polling)
    // refetchInterval: 2000,

    // Disable fetch data
    // enabled: false,

    // On success callback
    onSuccess,

    // On error callback
    onError,

    // Transforming data
    // select: (data) => {
    //   const superHeroesNames = data.data.map((hero) => hero.name);
    //   return superHeroesNames;
    // },
  });
};
