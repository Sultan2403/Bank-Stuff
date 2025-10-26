import { customers } from "./app.js";
const balanceBtn = document.getElementById("checkBalBtn");
const AccID = document.getElementById("acc-id");
const display = document.getElementById("display-area");
function chkBal(accID) {
  if (!/^\d+$/.test(accID) || accID <= 0) {
    display.textContent = `⚠️ Enter a valid account ID!`;
    console.log(`⚠️ Enter a valid account ID!`);
    return;
  }
  const foundAcc = customers.find((found) => found.accId === accID);
  if (!foundAcc) {
    display.textContent = `Account Not Found!`;
    console.log("Account Not Found!");
    return;
  }
  display.textContent = `Dear ${foundAcc.accHolder}, your balance is $${foundAcc.balance}. Thanks for using our services!`;
  console.log(foundAcc);
}
balanceBtn.addEventListener("click", () =>
  chkBal(parseInt(AccID.value.trim()))
);
