import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

const useAuth = () => {
  const { data } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  return data?.me;
};

export default useAuth;
