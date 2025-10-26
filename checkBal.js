import { customers, bankName } from "./app.js";
const balanceBtn = document.getElementById("checkBalBtn");
const AccID = document.getElementById("acc-id");
function chkBal(accID) {
  const foundAcc = customers.find((found) => found.accId === accID);
  console.log(foundAcc);
}
balanceBtn.addEventListener("click", () => chkBal(parseInt(AccID.value)));
