import { useMutation } from "@apollo/client";
import { Alert, Button, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../graphql/mutations";
import theme from "../theme";
import { formatDate } from "../utils/formatDate";
import Text from "./Text";

const ReviewItem = ({ review, repoName, reviewActions, refetch }) => {
  const navigate = useNavigate();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
      flexDirection: "row",
      padding: 10,
      marginTop: 10,
      flexWrap: "wrap",
    },
    ratingWrapper: {
      flex: 3,
      alignItems: "center",
    },
    rating: {
      borderWidth: 2,
      borderRadius: 25,
      padding: 10,
      borderColor: theme.colors.primary,
      color: theme.colors.primary,
      height: 50,
      width: 50,
      textAlign: "center",
      lineHeight: 25,
    },
    reviewWrapper: { flex: 9 },
  });
  const viewRepo = (id) => id && navigate(`/${id}`);
  const [mutate] = useMutation(DELETE_REVIEW);

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "DELETE", onPress: () => deleteReview(review?.id) },
      ]
    );

  const deleteReview = async (id) => {
    await mutate({ variables: { deleteReviewId: id } });
    refetch();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.ratingWrapper}>
          <Text style={styles.rating}>{review?.rating}</Text>
        </View>
        <View style={styles.reviewWrapper}>
          <Text fontWeight="bold">
            {repoName ? review?.repository?.fullName : review?.user?.username}
          </Text>
          <Text>{formatDate(review?.createdAt)}</Text>
          <Text>{review?.text}</Text>
        </View>
      </View>
      {reviewActions && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "#fff",
            padding: 10,
          }}
        >
          <Button
            onPress={() => viewRepo(review?.repository?.id)}
            title="View repository"
            color="#6366f1"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={createTwoButtonAlert}
            title="Delete review"
            color="#f43f5e"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      )}
    </>
  );
};

export default ReviewItem;
