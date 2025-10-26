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

// Function to handle fund transfer

function transferFunds(fromAccId, toAccId, amount) {
  const fromAccount = customers.find((acc) => acc.accId === fromAccId); // Find sender account
  const toAccount = customers.find((acc) => acc.accId === toAccId); // Find recipient account

  if (!fromAccount) {
    // Validate sender account
    console.log("Invalid account IDs.");
    display.textContent = "⚠️ Invalid sender account ID.";
    return;
  }

  if (!toAccount) {
    // Validate recipient account
    console.log("Invalid account IDs.");
    display.textContent = "⚠️ Invalid recipient account ID.";
    return;
  }

  if (fromAccount === toAccount) {
    // Prevent self-transfer
    console.log("⚠️ Cannot transfer to the same account.");
    display.textContent = "⚠️ Cannot transfer to the same account.";
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    // Validate transfer amount
    console.log("⚠️ Invalid transfer amount.");
    display.textContent = "⚠️ Enter a valid transfer amount.";
    return;
  }

  if (fromAccount.balance < amount) {
    // Check for sufficient funds
    console.log("Insufficient funds.");
    display.textContent = "Insufficient funds.";
    return;
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  console.log(
    `Transferred ${amount} using ${bankName} from ${fromAccount.accHolder} to ${toAccount.accHolder}.` +
      `Your balance is now ${fromAccount.balance}.`
  ); // Log transfer details
  console.log(fromAccount, toAccount); // Log updated accounts
  display.textContent = `Transferred $${amount} using ${bankName} from ${fromAccount.accHolder} to ${toAccount.accHolder}.`; // Update display
  display.textContent += ` Your balance is now $${fromAccount.balance}.`; // Update display
  localStorage.setItem("customers", JSON.stringify(customers)); // Update local storage
  console.table(customers); // Log updated customers
}

const btn = document.getElementById("transferBtn");
btn.addEventListener("click", () => {
  // Event listener for transfer button
  const fromAccId = parseInt(document.getElementById("fromAccId").value);
  const toAccId = parseInt(document.getElementById("toAccId").value);
  const amount = parseFloat(document.getElementById("amount").value);
  transferFunds(fromAccId, toAccId, amount); // Call transfer function
});
