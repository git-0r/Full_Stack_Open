import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);

  const createReview = async (review) => {
    try {
      const res = await mutate({ variables: { review } });
      return res?.data?.createReview?.repositoryId;
    } catch (error) {
      console.log(error);
    }
  };

  return createReview;
};

export default useCreateReview;
