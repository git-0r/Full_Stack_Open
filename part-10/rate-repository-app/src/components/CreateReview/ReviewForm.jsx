import * as yup from "yup";
import { Formik } from "formik";
import { Pressable, View } from "react-native";
import FormikTextInput from "../FormikTextInput";
import Text from "../Text";
import { styles } from "../../styles";

const ReviewForm = ({ onSubmit }) => {
  const initialValues = {
    repositoryName: "",
    ownerName: "",
    rating: "",
    text: "",
  };
  const validationSchema = yup.object().shape({
    repositoryName: yup.string().required("Repository name is required"),
    ownerName: yup.string().required("Repository owner name is required"),
    rating: yup.number().min(0).max(100).required("Rating is required"),
    text: yup.string().optional(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner name"
          />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
          />
          <FormikTextInput
            name="rating"
            type="number"
            placeholder="Rating between 0 and 100"
          />
          <FormikTextInput name="text" placeholder="Review" multiline={true} />
          <Pressable onPress={handleSubmit}>
            <View style={styles.flexCenter}>
              <Text style={styles.submitButton}>Create a review</Text>
            </View>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
