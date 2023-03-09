import { View, StyleSheet, Pressable } from "react-native";
import theme from "../../theme";
import RepositoryImage from "./RepositoryImage";
import RepositoryHeader from "./RepositoryHeader";
import RepositoryNumbericData from "./RepositoryNumericData";
import Text from "../Text";
import * as Linking from "expo-linking";

const RepositoryListItem = ({ item, github = false }) => {
  const styles = StyleSheet.create({
    flex: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      flex: 1,
    },
    flexRow: {
      flexDirection: "row",
    },
    flexColumn: {
      flexDirection: "column",
    },
    container: {
      padding: 20,
      backgroundColor: theme.colors.white,
      minHeight: 200,
    },
    language: {
      backgroundColor: theme.colors.primary,
      alignSelf: "flex-start",
      color: theme.colors.white,
      padding: 5,
      borderRadius: 5,
    },
    githubButton: {
      backgroundColor: theme.colors.primary,
      textAlign: "center",
      color: theme.colors.white,
      padding: 10,
      minHeight: 40,
      borderRadius: 5,
    },
  });

  const openWeb = () => {
    item && Linking.openURL(item?.url);
  };
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={{ ...styles.flex, ...styles.flexRow }}>
        <RepositoryImage uri={item?.ownerAvatarUrl} />
        <RepositoryHeader
          fullName={item?.fullName}
          description={item?.description}
          language={item?.language}
        />
      </View>
      <RepositoryNumbericData
        forksCount={item?.forksCount}
        stargazersCount={item?.stargazersCount}
        ratingAverage={item?.ratingAverage}
        reviewCount={item?.reviewCount}
      />
      {github && (
        <Pressable onPress={openWeb}>
          <Text style={styles.githubButton} fontWeight="bold">
            Open in Github
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryListItem;
