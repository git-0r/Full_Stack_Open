import { View, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";
import { GET_USER, ME } from "../graphql/queries";
import { useAuthStorage } from "../hooks/useAuthStorage";
import { useApolloClient, useQuery } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    color: theme.colors.primary,
  },
  text: {
    margin: 10,
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const storage = useAuthStorage();
  const { data } = useQuery(GET_USER);

  const signOut = async () => {
    await storage.removeAccessToken();
    apolloClient.resetStore();
    console.log("user logged out!");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text} color="white">
            Repositories
          </Text>
        </Link>
        {!data?.me?.id ? (
          <Link to="/signin">
            <Text style={styles.text} color="white">
              Sign In
            </Text>
          </Link>
        ) : (
          <TouchableHighlight onPress={signOut}>
            <View>
              <Text style={styles.text} color="white">
                Sign Out
              </Text>
            </View>
          </TouchableHighlight>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
