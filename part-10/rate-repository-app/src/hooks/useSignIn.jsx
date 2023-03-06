import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useAuthStorage } from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();

  const signIn = async (credentials) => {
    // call the mutate function here with the right arguments
    try {
      const res = await mutate({ variables: { credentials } });
      await authStorage.setAccessToken(res.data.authenticate.accessToken);
      apolloClient.resetStore();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return [signIn, result];
};

export default useSignIn;
