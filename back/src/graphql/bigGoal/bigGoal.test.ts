import { ApolloServerTestClient } from "apollo-server-testing";
import { Server } from "http";

import { getApolloTestServerStarter } from "../../__tests__/utils";
import { gql } from "apollo-server-express";
import {
  defaultBigGoals,
  createdBigGoals,
} from "../../services/bigGoal/__mocks__";
import { typeDefs, queries, mutations } from "./";
jest.mock("../../services/bigGoal");

describe("account graphl", () => {
  let httpServer: Server;
  let testClient: ApolloServerTestClient;
  let createTestClient: () => ApolloServerTestClient;

  it("Query big goals", async () => {
    const response = await testClient.query({ query: LIST_BIG_GOALS });
    expect(response.errors).toBeFalsy();
    expect(response.data?.bigGoals).toEqual(defaultBigGoals);
  });
  it("Saves multiple big goals", async () => {
    const goals = ["goal1", "goal2"];
    const response = await testClient.mutate({
      mutation: SAVE_BIG_GOALS,
      variables: { goals },
    });
    expect(response.errors).toBeFalsy();
    expect(response.data?.addBigGoals).toEqual(createdBigGoals);
  });
  beforeEach(() => {
    testClient = createTestClient();
  });
  beforeAll(async () => {
    const { startTestServer } = getApolloTestServerStarter({
      typeDefs,
      queries,
      mutations,
    });
    ({ httpServer, createTestClient } = await startTestServer());
  });
  afterAll(() => {
    httpServer.close();
  });
});

const LIST_BIG_GOALS = gql`
  query listBigGoal {
    bigGoals {
      id
      title
    }
  }
`;

const SAVE_BIG_GOALS = gql`
  mutation saveBigGoals($goals: [String]!) {
    addBigGoals(goals: $goals) {
      id
      title
    }
  }
`;
