import { StyleSheet, View } from "react-native";
import { FormatNumber } from "../../utils/formatNumber";
import Text from "../Text";

const RepositoryNumbericData = ({
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
}) => {
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
  });

  return (
    <View style={{ ...styles.flex, ...styles.flexRow, margin: 8 }}>
      <View style={styles.flex}>
        <Text fontWeight="bold" testID="forks">
          {FormatNumber(forksCount)}
        </Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.flex}>
        <Text fontWeight="bold" testID="stars">
          {FormatNumber(stargazersCount)}
        </Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.flex}>
        <Text fontWeight="bold" testID="rating">
          {ratingAverage}
        </Text>
        <Text>Rating</Text>
      </View>
      <View style={styles.flex}>
        <Text fontWeight="bold" testID="reviews">
          {reviewCount}
        </Text>
        <Text>Reviews</Text>
      </View>
    </View>
  );
};

export default RepositoryNumbericData;
