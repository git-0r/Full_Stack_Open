import * as yup from "yup";
import { Formik } from "formik";
import { Pressable, View } from "react-native";
import FormikTextInput from "../FormikTextInput";
import Text from "../Text";
import { styles } from "../../styles";

const SignUpForm = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
    passwordConfirm: "",
  };
  const validationSchema = yup.object().shape({
    username: yup.string().min(1).max(30).required("Username is required"),
    password: yup.string().min(5).max(50).required("Password is required"),
    passwordConfirm: yup
      .string()
      .min(5)
      .max(50)
      .oneOf([yup.ref("password")], "Password does not match")
      .required("Password confirmation is required"),
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
          <FormikTextInput
            name="passwordConfirm"
            placeholder="Password confirmation"
            secureTextEntry={true}
          />
          <Pressable onPress={handleSubmit}>
            <View style={styles.flexCenter}>
              <Text style={styles.submitButton}>Sign up</Text>
            </View>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
