import { FlatList } from "react-native";
import { useParams } from "react-router-native";
import RepositoryListItem from "../RepositoryList/RepositoryListItem";
import ReviewItem from "../ReviewItem";
import useReviews from "../../hooks/useReviews";

const RepositoryView = () => {
  const { id: repositoryId } = useParams();

  const { repository, fetchMore } = useReviews({
    first: 6,
    repositoryId,
  });

  const onEndReach = () => {
    fetchMore();
    console.log("You have reached the end of the list");
  };

  return (
    <FlatList
      data={repository?.reviews?.edges}
      renderItem={({ item }) => <ReviewItem review={item?.node} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => (
        <RepositoryListItem item={repository} github={true} />
      )}
      onEndReached={onEndReach}
    />
  );
};

export default RepositoryView;
