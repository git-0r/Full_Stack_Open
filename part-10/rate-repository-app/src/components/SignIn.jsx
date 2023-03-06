import * as yup from "yup";
import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
      paddingLeft: 20,
      paddingRight: 20,
    },
    input: {
      borderColor: "gray",
      borderWidth: 1,
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      minHeight: 40,
      borderRadius: 5,
    },
    flexCenter: {
      justifyContent: "center",
      alignItems: "center",
      minHeight: 40,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
      marginBottom: 10,
    },
    submitButton: {
      color: theme.colors.white,
      fontWeight: theme.fontWeights.bold,
    },
  });

  const validationSchema = yup.object().shape({
    username: yup.string().required("username is required"),
    password: yup.string().required("password is required"),
  });

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <FormikTextInput
              style={styles.input}
              name="username"
              placeholder="Username"
            />
            <FormikTextInput
              style={styles.input}
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
    </View>
  );
};

export default SignIn;
