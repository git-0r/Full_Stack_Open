import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query (
    $searchKeyword: String
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $after: String
    $first: Int
  ) {
    repositories(
      searchKeyword: $searchKeyword
      orderDirection: $orderDirection
      orderBy: $orderBy
      after: $after
      first: $first
    ) {
      edges {
        node {
          id
          fullName
          ownerAvatarUrl
          description
          language
          forksCount
          reviewCount
          ratingAverage
          stargazersCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const GET_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      ownerAvatarUrl
      description
      language
      forksCount
      reviewCount
      ratingAverage
      stargazersCount
      url
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
