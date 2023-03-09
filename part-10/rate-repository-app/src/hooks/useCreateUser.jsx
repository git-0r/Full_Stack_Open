import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate] = useMutation(CREATE_USER);

  const createUser = async (user) => {
    try {
      await mutate({ variables: { user } });
    } catch (error) {
      console.log(error);
    }
  };

  return createUser;
};

export default useCreateUser;
