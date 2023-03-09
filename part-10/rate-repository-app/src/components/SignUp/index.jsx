import { View } from "react-native";
import useSignIn from "../../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import SignUpForm from "./SignUpForm";
import useCreateUser from "../../hooks/useCreateUser";

const SignUp = () => {
  const [signIn] = useSignIn();
  const createUser = useCreateUser();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <SignUpForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignUp;
