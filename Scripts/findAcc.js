// Importing necessary variables and elements
import { customers, bankName } from "./app.js";

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
const display = document.getElementById("display"); // Display area

// Getting DOM elements
const findBtn = document.getElementById("findBtn");
const AccID = document.getElementById("AccId");

function findAcc(accID) {
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
  display.innerHTML = `Account Holder: ${foundAcc.accHolder}<br>
  Account ID: ${foundAcc.accId}<br>
  Account Type: ${foundAcc.type} <br>
   Balance: $${foundAcc.balance.toFixed(
     // Display balance
     2
   )}<br>
    <br> Thanks for using ${bankName}!`;
  console.log(
    `Account Holder ${foundAcc.accHolder}<br>
  Account ID: ${foundAcc.accId}<br>
  Account Type: ${foundAcc.type}<br>
   Balance: $${foundAcc.balance.toFixed(
     // Display balance
     2
   )}<br>
    <br> Thanks for using ${bankName}!`
  );
}
findBtn.addEventListener(
  "click",
  () =>
    // Event listener for balance button
    findAcc(parseInt(AccID.value.trim())) // Call check balance function
);
console.log(localStorage.getItem("customers"));
