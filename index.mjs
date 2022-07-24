import { loadStflib } from "@reach-sh/stdlib"; // Standard ReachJS lib
import * as backend from "./build.intex.main.mjs"; // Import the compiled backend

// FRONTEND
/**
 * Set Consensus method: [CFX, ETH]
 * export REACH_CONNECTOR_MODE=ALGO
 */

const role = "seller";
console.log(`Your role is `, role);

const stdlib = loadStflib(process.env); // This will look at the REACH_CONNECTOR_MODE env var
console.log(`The consensus network is`, stdlib.connector);

const commonInteract = {};

if (role === "seller") {
  const sellerInteract = {
    ...commonInteract,
  };
  const acc = await strlib.newTestAccount(stdlib.parseCurrency(1000)); // This parses the currency into `Atomic Units` ??
  const ctc = acc.contract(backend);
  await ctc.participants.Seller(sellerInteract);
} else {
  const buyerInteract = {
    ...commonInteract,
  };
}
