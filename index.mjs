import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";

// FRONT END

// Fetch the role from the command line arg using `reach run index seller`
// `index` is the name of the rsh file - required if using args
if (
  process.argv.length < 3 ||
  ["seller", "buyer"].includes(process.argv[2]) == false
) {
  process.exit(0);
}
const role = process.argv[2];
console.log(`Your role is ${role}`);

const stdlib = loadStdlib(process.env);
console.log(`The consensus network is ${stdlib.connector}.`);

const convertToAtomic = (standardAmount) =>
  stdlib.parseCurrency(standardAmount);
const convertToStandard = (atomicAmount) =>
  stdlib.formatCurrency(atomicAmount, 4);

const initialBalance = convertToAtomic(1000);

const showBalance = async (account) =>
  console.log(
    ` ------ Your balance is ${convertToStandard(
      await stdlib.balanceOf(account)
    )} -------`
  );

const commonInteract = {};

if (role === "seller") {
  const sellerInteract = {
    ...commonInteract,
  };
  const accountOne = await stdlib.newTestAccount(initialBalance);
  await showBalance(accountOne);
  const contract = accountOne.contract(backend);
  await contract.participants.Seller(sellerInteract);
  await showBalance(accountOne);
} else {
  const buyerInteract = {
    ...commonInteract,
  };
}
