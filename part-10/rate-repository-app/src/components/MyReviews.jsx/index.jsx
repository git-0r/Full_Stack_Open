import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { GET_USER } from "../../graphql/queries";
import ReviewItem from "../ReviewItem";

const MyReviews = () => {
  const { data, refetch } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  return (
    <FlatList
      data={data?.me?.reviews?.edges || []}
      renderItem={({ item }) => (
        <ReviewItem
          review={item?.node}
          repoName={true}
          reviewActions={true}
          refetch={refetch}
        />
      )}
      keyExtractor={({ node }) => node.id}
    />
  );
};

export default MyReviews;
