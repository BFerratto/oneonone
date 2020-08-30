import { ApolloServerTestClient } from "apollo-server-testing";
import { Server } from "http";

import { getApolloTestServerStarter } from "../../__tests__/utils";
import { gql } from "apollo-server-express";
import {
  defaultAccounts,
  newAccountId,
} from "../../services/__mocks__/account";
import { typeDefs, queries, mutations } from ".";

jest.mock("../../services/account");

describe("account graphl", () => {
  let httpServer: Server;
  let testClient: ApolloServerTestClient;
  let createTestClient: () => ApolloServerTestClient;

  it("Query accounts", async () => {
    const res = await testClient.query({ query: GET_ACCOUNTS });
    expect(res.errors).toBeFalsy();

    expect(res.data?.account).toEqual(defaultAccounts);
  });
  it("Mutates accounts", async () => {
    const email = "mock@email.com";
    const res = await testClient.mutate({
      mutation: SAVE_ACCOUNT,
      variables: { email },
    });
    expect(res.errors).toBeFalsy();
    const expected = { email, id: newAccountId };
    expect(res.data?.addAccount).toEqual(expected);
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

const GET_ACCOUNTS = gql`
  query getAccounts {
    account {
      email
      id
    }
  }
`;

const SAVE_ACCOUNT = gql`
  mutation saveAccount($email: String!) {
    addAccount(email: $email) {
      id
      email
    }
  }
`;
