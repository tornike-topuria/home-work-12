let banks = [];
let users = [];

let bankCreateForm = document.querySelector('#create__bank');
let userCreateForm = document.querySelector('#register__user');
let usersList = document.querySelector('.users__list');
let transactionsForm = document.querySelector('#transactions');


transactionsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let from = transactionsForm.from.value;
    let amount = transactionsForm.amount.value;
    let to = transactionsForm.to.value;

    let bank = userCreateForm.bankSelect.value;

    let selectedBank = banks.find(b => b.name === bank);

    if (!selectedBank) return;

    selectedBank.transaction(+from, +to, +amount);
    renderUsersList();
    console.log(banks);
})


userCreateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let userName = userCreateForm.username.value;
    let balance = userCreateForm.balance.value;
    let bank = userCreateForm.bankSelect.value;

    let user = new User(userName, Number(balance));

    let selectedBank = banks.find(b => b.name === bank);
    console.log(selectedBank);
    if (!selectedBank) return;

    selectedBank.registerUser(user);
    users.push(user);
    renderUsersList();
    userCreateForm.username.value = '';
    userCreateForm.balance.value = '';

    console.log(banks);
})



bankCreateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let bankName = bankCreateForm.bankName.value;

    banks.push(new Bank(bankName))
    bankCreateForm.bankName.value = '';
    renderBankList();
})


function renderBankList() {
    userCreateForm.bankSelect.innerHTML = '';

    banks.forEach((bank) => {
        let option = document.createElement('option');
        option.value = bank.name;
        option.text = bank.name;
        userCreateForm.bankSelect.appendChild(option);
    })
}

function renderUsersList() {
    usersList.innerHTML = '';
    let accounts = [];

    banks.forEach(bank => {
        accounts.push(bank.bankAccounts);
    })

    accounts.flat().forEach((bankAccount) => {
        let li = document.createElement('li');
        li.textContent = `${bankAccount.ownerName} - ${bankAccount.bank} - ${bankAccount.accountNumber} - ${bankAccount.balance}`;

        usersList.appendChild(li);
    })
}


// დავალება

let BankFillAccount = document.querySelector("#bank_account")

BankFillAccount.addEventListener("submit", (event) => {
    event.preventDefault()

    let ul = document.querySelector(".bank_user")

    let OneAccount = document.querySelector(".one_account")
    let TwoAccount = document.querySelector(".two_account")
    let ThreeAccount = document.querySelector(".three_account")
    

    let OneAmount = document.querySelector(".one_amount")
    let TwoAmount = document.querySelector(".two_amount")
    let ThreeAmount = document.querySelector(".three_amount")
    

    if (BankFillAccount.account.value == OneAccount.textContent) {

        OneAmount.textContent = Number(OneAmount.textContent) + Number(BankFillAccount.amount.value);
    }

    if (BankFillAccount.account.value == TwoAccount.textContent) {

       TwoAmount.textContent = Number(  TwoAmount.textContent) + Number(BankFillAccount.amount.value);
    }

    if (BankFillAccount.account.value == ThreeAccount.textContent) {

        ThreeAmount.textContent = Number( ThreeAmount.textContent) + Number(BankFillAccount.amount.value);
    }

})




