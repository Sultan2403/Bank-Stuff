import { customers, bankName } from "./app.js";
const userAccID = document.getElementById("acc-id");
const amountToDeposit = document.getElementById("deposit-inp-field");
const depositBtn = document.getElementById("deposit-btn");
const display = document.getElementById("display-area");

function getUsers() {
  const storedCustomers = JSON.parse(localStorage.getItem("customers"));
  if (Array.isArray(storedCustomers)) {
    customers.splice(0, customers.length, ...storedCustomers);
  } else {
    console.log("No customers found in local storage.");
  }
}
getUsers();

function depositMoney(accID, depositAmount) {
  const foundAcc = customers.find((found) => found.accId === accID);
  if (!/^\d+$/.test(accID) || accID <= 0) {
    display.textContent = `⚠️ Enter a valid account ID!`;
    console.log(`⚠️ Enter a valid account ID!`);
    return;
  }
  if (!foundAcc) {
    display.textContent = `Account Not Found!`;
    console.log("Account Not Found!");
    return;
  }
  if (depositAmount <= 0) {
    display.textContent = `⚠️ Please enter a valid deposit amount greater than 0!`;
    console.log("⚠️ Please enter a valid deposit amount!");
    return;
  }
  if (depositAmount < 1) {
    display.textContent = `⚠️ Minimum deposit amount is $1!`;
    console.log("⚠️ Minimum deposit amount is $1!");
    return;
  }
  display.textContent = `Dear ${
    foundAcc.accHolder
  }, you have successfully topped up your account. Your current balance is: $${
    foundAcc.balance + depositAmount
  }`;
  console.log(
    `Dear ${
      foundAcc.accHolder
    }, you have successfully topped up your account. your current balance is: $${(foundAcc.balance +=
      depositAmount)}`
  );
  localStorage.setItem("customers", JSON.stringify(customers));
}

depositBtn.addEventListener("click", () =>
  depositMoney(parseInt(userAccID.value), parseFloat(amountToDeposit.value))
);
