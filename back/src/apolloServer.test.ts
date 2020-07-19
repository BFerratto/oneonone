import {
  createTestClient,
  ApolloServerTestClient,
} from "apollo-server-testing";
import { gql, ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import {
  getAccounts as mockGetAccounts,
  defaultAccounts,
  newAccountId,
} from "./services/__mocks__/account";
import express from "express";
import { Server } from "http";

jest.mock("./services/account");

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
  let apolloServer: any;
  let testClient: ApolloServerTestClient;

  async function startTestServer() {
    const app = express();
    apolloServer = new ApolloServer({ typeDefs, resolvers });

    apolloServer.applyMiddleware({ app });
    httpServer = await app.listen(0);
  }
  beforeEach(() => {
    testClient = createTestClient(apolloServer);
    mockGetAccounts.mockClear();
  });
  beforeAll(async () => {
    await startTestServer();
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
