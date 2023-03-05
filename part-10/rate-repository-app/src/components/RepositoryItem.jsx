import { View, StyleSheet } from "react-native";
import theme from "../theme";
import RepositoryImage from "./RepositoryImage";
import Text from "./Text";

const RepositoryListItem = ({ item }) => {
  const FormatNumber = (num) => {
    if (num >= 10000) return FormatNumber(num / 1000).toPrecision(3) / 1 + "K";

    if (num >= 1000) return (num / 1000).toPrecision(2) / 1 + "K";

    return num;
  };

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
    },
    language: {
      backgroundColor: theme.colors.primary,
      alignSelf: "flex-start",
      color: theme.colors.white,
      padding: 5,
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ ...styles.flex, ...styles.flexRow }}>
        <RepositoryImage uri={item.ownerAvatarUrl} />
        <View style={{ flex: 7 }}>
          <Text fontWeight="bold" fontSize="subheading" style={{ margin: 2 }}>
            {item.fullName}
          </Text>
          <Text fontSize="body" color="textSecondary" style={{ margin: 2 }}>
            {item.description}
          </Text>
          <Text style={{ ...styles.language, margin: 2 }}>{item.language}</Text>
        </View>
      </View>
      <View style={{ ...styles.flex, ...styles.flexRow, margin: 8 }}>
        <View style={styles.flex}>
          <Text fontWeight="bold">{FormatNumber(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.flex}>
          <Text fontWeight="bold">{FormatNumber(item.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.flex}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
        <View style={styles.flex}>
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryListItem;
