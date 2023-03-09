import * as yup from "yup";
import { Formik } from "formik";
import { Pressable, View } from "react-native";
import FormikTextInput from "../FormikTextInput";
import Text from "../Text";
import { styles } from "../../styles";

const SignInForm = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    username: yup.string().required("username is required"),
    password: yup.string().required("password is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry={true}
          />
          <Pressable onPress={handleSubmit}>
            <View style={styles.flexCenter}>
              <Text style={styles.submitButton}>Sign in</Text>
            </View>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
