import { StyleSheet } from "react-native";
import theme from "./theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingLeft: 20,
    paddingRight: 20,
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
