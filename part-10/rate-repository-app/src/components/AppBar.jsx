import { View, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { Link, useNavigate } from "react-router-native";
import { useAuthStorage } from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import useAuth from "../hooks/useAuth";

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
  const user = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await storage.removeAccessToken();
    apolloClient.resetStore();
    console.log("user logged out!");
    navigate("/");
  };

  const switchToReview = () => navigate("/review");
  const switchToMyReviews = () => navigate("/myreviews");

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.text} color="white">
            Repositories
          </Text>
        </Link>
        {user && (
          <>
            <TouchableHighlight onPress={switchToReview}>
              <View>
                <Text style={styles.text} color="white">
                  Create a review
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={switchToMyReviews}>
              <View>
                <Text style={styles.text} color="white">
                  My Reviews
                </Text>
              </View>
            </TouchableHighlight>
          </>
        )}
        {!user ? (
          <>
            <Link to="/signin">
              <Text style={styles.text} color="white">
                Sign in
              </Text>
            </Link>
            <Link to="/signup">
              <Text style={styles.text} color="white">
                Sign up
              </Text>
            </Link>
          </>
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
