// Importing necessary variables and elements
import { customers, bankName } from "./app.js";

// Getting DOM elements
const userAccID = document.getElementById("acc-id");
const amountToDeposit = document.getElementById("deposit-inp-field");
const depositBtn = document.getElementById("deposit-btn");
const display = document.getElementById("display-area");

// Function to retrieve users from local storage
function getUsers() {
  const storedCustomers = JSON.parse(localStorage.getItem("customers"));
  if (Array.isArray(storedCustomers)) {
    customers.splice(0, customers.length, ...storedCustomers);
  } else {
    console.log("No customers found in local storage.");
  }
}
getUsers(); // Call to retrieve users

// Function to handle deposit money
function depositMoney(accID, depositAmount) {
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
  if (depositAmount <= 0) {
    // Validate deposit amount
    display.textContent = `⚠️ Please enter a valid deposit amount greater than 0!`;
    console.log("⚠️ Please enter a valid deposit amount!");
    return;
  }
  if (depositAmount < 1) {
    // Minimum deposit amount check
    display.textContent = `⚠️ Minimum deposit amount is $1!`;
    console.log("⚠️ Minimum deposit amount is $1!");
    return;
  }
  const currBal = (foundAcc.balance += depositAmount); // Update balance
  display.textContent = `Dear ${foundAcc.accHolder}, you have successfully topped up your account. Your current balance is: $${currBal}`;
  console.log(
    `Dear ${foundAcc.accHolder}, you have successfully topped up your account. your current balance is: $${currBal}`
  );
  localStorage.setItem("customers", JSON.stringify(customers)); // Update local storage
}

depositBtn.addEventListener("click", () =>
  // Event listener for deposit button
  depositMoney(
    // Call deposit function
    parseInt(userAccID.value.trim()),
    parseFloat(amountToDeposit.value.trim())
  )
);
