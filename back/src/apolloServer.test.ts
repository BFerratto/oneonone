import { ApolloServerTestClient } from "apollo-server-testing";
import { getApolloTestServerStarter } from "./__tests__/utils";
import { gql } from "apollo-server-express";
import {
  getAccounts as mockGetAccounts,
  defaultAccounts,
  newAccountId,
} from "./services/__mocks__/account";
import { Server } from "http";

jest.mock("./services/account");
jest.mock("./services/bigGoal");

const GET_ACCOUNTS = gql`
  query getAccounts {
    account {
      email
      id
    }
  }
`;

const SAVE_ACCOUNT = gql`
  mutation saeAccount($email: String!) {
    addAccount(email: $email) {
      id
      email
    }
  }
`;
describe("Apollo server", () => {
  let httpServer: Server;
  let testClient: ApolloServerTestClient;
  let createTestClient: () => ApolloServerTestClient;
  beforeEach(() => {
    testClient = createTestClient();
    mockGetAccounts.mockClear();
  });
  beforeAll(async () => {
    const { typeDefs, resolvers } = require("./graphql");

    const { startTestServer } = getApolloTestServerStarter({
      typeDefs,
      resolvers,
    });
    ({ httpServer, createTestClient } = await startTestServer());
  });
  afterAll(() => {
    httpServer.close();
  });
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
});
