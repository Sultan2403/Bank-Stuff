// Importing necessary variables and elements
import { customers } from "./app.js";

// Getting users from local storage
function getUsers() {
  const storedCustomers = JSON.parse(localStorage.getItem("customers"));
  if (Array.isArray(storedCustomers)) {
    customers.splice(0, customers.length, ...storedCustomers);
  } else {
    console.log("No customers found in local storage.");
  }
}
getUsers(); // Call to retrieve users

// Getting DOM elements
const balanceBtn = document.getElementById("checkBalBtn");
const AccID = document.getElementById("acc-id");
const display = document.getElementById("display-area");
function chkBal(accID) {
  if (!/^\d+$/.test(accID) || accID <= 0) {
    // Validate account ID
    display.textContent = `⚠️ Enter a valid account ID!`;
    console.log(`⚠️ Enter a valid account ID!`);
    return;
  }
  const foundAcc = customers.find((found) => found.accId === accID);
  if (!foundAcc) {
    // Check if account exists
    display.textContent = `Account Not Found!`;
    console.log("Account Not Found!");
    return;
  }
  display.textContent = `Dear ${
    foundAcc.accHolder
  }, your balance is $${foundAcc.balance.toFixed(
    // Display balance
    2
  )}. Thanks for using our services!`;
  console.log(
    `Dear ${foundAcc.accHolder}, your balance is $${foundAcc.balance.toFixed(
      2
    )}. Thanks for using our services!`
  );
}
balanceBtn.addEventListener(
  "click",
  () =>
    // Event listener for balance button
    chkBal(parseInt(AccID.value.trim())) // Call check balance function
);
