import { View } from "react-native";
import { useNavigate } from "react-router-native";
import useCreateReview from "../../hooks/useCreateReview";
import ReviewForm from "./ReviewForm";

const CreateReview = () => {
  const createReview = useCreateReview();
  const navigate = useNavigate();
  const submitReview = async (values) => {
    values.rating = Number(values.rating);
    const id = await createReview(values);
    navigate(`/${id}`);
  };
  return (
    <View>
      <ReviewForm onSubmit={submitReview} />
    </View>
  );
};

export default CreateReview;
