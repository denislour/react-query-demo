import { useQuery } from "react-query";
import axios from "axios";

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
  };

  const { isLoading, data, isError, error, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
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
      select: (data) => {
        const superHeroesNames = data.data.map((hero) => hero.name);
        return superHeroesNames;
      },
    }
  );

  if (isLoading) {
    return <h2>Is Loading ...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch heroes</button>
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </div>
  );
};
