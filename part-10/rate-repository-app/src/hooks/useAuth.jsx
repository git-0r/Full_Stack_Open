import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

const useAuth = () => {
  const { data, loading } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  const getUser = () => {};
  return [data, loading];
};

export default useAuth;
