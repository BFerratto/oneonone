import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import { List as BaseList } from "../../../commons/List";
export const GET_ACCOUNTS = gql`
  query getAccounts {
    account {
      id
      email
    }
  }
`;
export interface Props {}
export const List: FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);
  return (
    <BaseList
      loading={loading}
      items={data?.account.map(({ email }) => email)}
    />
  );
};
