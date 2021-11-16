import { useQuery } from "react-query";
import axios from "axios";

export const RQSuperHeroesPage = () => {
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

      enabled: false,
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
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </div>
  );
};
