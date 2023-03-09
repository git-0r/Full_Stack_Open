import { useState } from "react";
import useRepositories from "../../hooks/useRepositories";
import { RepositoryListContainer } from "./RepositoryListContainer";

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [timerId, setTimerId] = useState(null);
  const [principle, setPrinciple] = useState({
    orderBy: null,
    orderDirection: null,
  });

  const { repositories, fetchMore } = useRepositories({
    first: 6,
    ...principle,
    searchKeyword,
  });

  // Use the ref to access the current value of the debounced function
  const onChangeSearch = (query) => {
    setSearchQuery(query);

    // Clear the previous timer if any
    if (timerId) {
      clearTimeout(timerId);
    }

    // Set a new timer with a delay of 1000 ms
    const newTimerId = setTimeout(() => {
      // Call your debounced function here with the latest input value
      setSearchKeyword(query);
    }, 500);

    // Update the timer id state
    setTimerId(newTimerId);
  };

  const onEndReach = () => {
    fetchMore();
    console.log("You have reached the end of the list");
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      setPrinciple={setPrinciple}
      onChangeSearch={onChangeSearch}
      searchQuery={searchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
