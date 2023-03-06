import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
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
    }
  }
`;

export const GET_USER = gql`
  query {
    me {
      id
    }
  }
`;
