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
const withdrawalInput = document.getElementById("withdrawal-inp-field");
const display = document.getElementById("display-area");
const withdrawalBtn = document.getElementById("withdraw-btn");
const userAccID = document.getElementById("acc-id-inp-field");

// Function to handle withdrawal money
function withdrawMoney(accID, withdrawAmt) {
  const foundAcc = customers.find((found) => found.accId === accID);
  if (!/^\d+$/.test(accID) || accID <= 0) {
    // Validate account ID
    display.textContent = `⚠️ Enter a valid account ID!`;
    console.log(`⚠️ Enter a valid account ID!`);
    return;
  }
  if (!foundAcc) {
    // Check if account exists
    display.textContent = `Account Not Found!`;
    console.log("Account Not Found!");
    return;
  }
  if (withdrawAmt <= 0) {
    // Validate withdrawal amount
    display.textContent = `⚠️ Please enter a valid deposit amount greater than 0!`;
    console.log("⚠️ Please enter a valid deposit amount!");
    return;
  }
  if (withdrawAmt < 1) {
    // Minimum withdrawal amount check
    display.textContent = `⚠️ Minimum deposit amount is $1!`;
    console.log("⚠️ Minimum deposit amount is $1!");
    return;
  }
  if (foundAcc.balance < withdrawAmt) {
    // Check for sufficient funds
    display.textContent = `⚠️ Insufficient funds!`;
    console.log("⚠️ Insufficient funds!");
    return;
  }
  const currBal = (foundAcc.balance -= withdrawAmt); // Update balance
  display.textContent = `Dear ${foundAcc.accHolder}, you have successfully withdrawn money from your account. Your current balance is: $${currBal}`;
  console.log(
    `Dear ${foundAcc.accHolder}, you have successfully withdrawn money from your account. your current balance is: $${currBal}`
  );
  localStorage.setItem("customers", JSON.stringify(customers)); // Update local storage
}

withdrawalBtn.addEventListener("click", () =>
  // Event listener for withdrawal button
  withdrawMoney(
    // Call withdrawal function
    parseInt(userAccID.value.trim()),
    parseFloat(withdrawalInput.value.trim())
  )
);
