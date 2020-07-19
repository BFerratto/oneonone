import { Account } from "../orm/entity/Account";

export async function getAccounts() {
  const accounts = await Account.find();
  return accounts;
}

export async function saveAccount({ email }: { email: string }) {
  const createdAccount = new Account();
  createdAccount.email = email;
  const savedAccount = await createdAccount.save();
  return savedAccount;
}
