import { customers, bankName } from "./app.js";
function getUsers() {
  const storedCustomers = JSON.parse(localStorage.getItem("customers"));
  if (Array.isArray(storedCustomers)) {
    customers.splice(0, customers.length, ...storedCustomers);
  } else {
    console.log("No customers found in local storage.");
  }
}
getUsers();
const display = document.getElementById("display");

function transferFunds(fromAccId, toAccId, amount) {
  const fromAccount = customers.find((acc) => acc.accId === fromAccId);
  const toAccount = customers.find((acc) => acc.accId === toAccId);

  if (!fromAccount) {
    console.log("Invalid account IDs.");
    display.textContent = "⚠️ Invalid sender account ID.";
    return;
  }

  if (!toAccount) {
    console.log("Invalid account IDs.");
    display.textContent = "⚠️ Invalid recipient account ID.";
    return;
  }

  if (fromAccount === toAccount) {
    display.textContent = "⚠️ Cannot transfer to the same account.";
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    display.textContent = "⚠️ Enter a valid transfer amount.";
    return;
  }

  if (fromAccount.balance < amount) {
    console.log("Insufficient funds.");
    display.textContent = "Insufficient funds.";
    return;
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  console.log(
    `Transferred ${amount} using ${bankName} from ${fromAccount.accHolder} to ${toAccount.accHolder}.` +
      `Your balance is now ${fromAccount.balance}.`
  );
  console.log(fromAccount, toAccount);
  display.textContent = `Transferred $${amount} using ${bankName} from ${fromAccount.accHolder} to ${toAccount.accHolder}.`;
  display.textContent += ` Your balance is now $${fromAccount.balance}.`;
  localStorage.setItem("customers", JSON.stringify(customers));
  console.table(customers);
}

const btn = document.getElementById("transferBtn");
btn.addEventListener("click", () => {
  const fromAccId = parseInt(document.getElementById("fromAccId").value);
  const toAccId = parseInt(document.getElementById("toAccId").value);
  const amount = parseFloat(document.getElementById("amount").value);
  transferFunds(fromAccId, toAccId, amount);
});
