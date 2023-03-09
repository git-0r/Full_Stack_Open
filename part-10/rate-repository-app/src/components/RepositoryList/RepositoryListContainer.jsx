import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Searchbar } from "react-native-paper";
import RepositoryListItem from "./RepositoryListItem";
import SortingOptions from "./SortingOptions";

const ItemSeparator = () => <View style={styles.separator} />;
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({
  repositories,
  setPrinciple,
  onChangeSearch,
  searchQuery,
  onEndReach,
}) => {
  const navigate = useNavigate();

  const viewRepo = (id) => {
    navigate(`/${id}`);
  };
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => viewRepo(item.id)}>
          <RepositoryListItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <SortingOptions setPrinciple={setPrinciple} />
        </View>
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};
