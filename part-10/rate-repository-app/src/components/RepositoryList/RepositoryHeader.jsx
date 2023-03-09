import { StyleSheet, View } from "react-native";
import theme from "../../theme";
import Text from "../Text";

const RepositoryHeader = ({ fullName, description, language }) => {
  const styles = StyleSheet.create({
    language: {
      backgroundColor: theme.colors.primary,
      alignSelf: "flex-start",
      color: theme.colors.white,
      padding: 5,
      borderRadius: 5,
    },
  });

  return (
    <View style={{ flex: 7 }}>
      <Text
        testID="name"
        fontWeight="bold"
        fontSize="subheading"
        style={{ margin: 2 }}
      >
        {fullName}
      </Text>
      <Text
        fontSize="body"
        color="textSecondary"
        style={{ margin: 2 }}
        testID="description"
      >
        {description}
      </Text>
      <Text style={{ ...styles.language, margin: 2 }} testID="language">
        {language}
      </Text>
    </View>
  );
};

export default RepositoryHeader;
