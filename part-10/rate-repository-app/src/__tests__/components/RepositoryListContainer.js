import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryListContainer";
import { FormatNumber } from "../../utils/formatNumber";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      // Add your test code here
      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const firstItem = (id) =>
        expect(within(firstRepositoryItem).getByTestId(id));
      const secondItem = (id) =>
        expect(within(secondRepositoryItem).getByTestId(id));

      firstItem("name").toHaveTextContent("jaredpalmer/formik");
      firstItem("forks").toHaveTextContent(FormatNumber(1619));
      firstItem("stars").toHaveTextContent(FormatNumber(21856));
      firstItem("rating").toHaveTextContent("88");
      firstItem("reviews").toHaveTextContent("3");
      firstItem("language").toHaveTextContent("TypeScript");
      firstItem("description").toHaveTextContent(
        "Build forms in React, without the tears"
      );

      secondItem("name").toHaveTextContent("async-library/react-async");
      secondItem("forks").toHaveTextContent(FormatNumber(69));
      secondItem("stars").toHaveTextContent(FormatNumber(1760));
      secondItem("rating").toHaveTextContent("72");
      secondItem("reviews").toHaveTextContent("3");
      secondItem("language").toHaveTextContent("JavaScript");
      secondItem("description").toHaveTextContent(
        "Flexible promise-based React data loader"
      );
    });
  });
});
