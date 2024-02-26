class Bank {
    name;
    users = [];
    bankAccounts = [];
  
    constructor(name) {
      this.name = name;
    }
  
    registerUser(user) {
      if(user instanceof User) {
        user.id = this.users.length;
        user.bank = this.name;
        let accountNumber = randomAccountNumber();
        
        while(true) {
          let result = this.bankAccounts.some((acc) => acc.accountNumber === accountNumber)
  
          if(!result) break;
  
          accountNumber = randomAccountNumber();
        }
  
        let bankAcc = new BankAccount(this.bankAccounts.length, user.id, accountNumber, user.balance, this.name, user.name);
        this.bankAccounts.push(bankAcc);
        this.users.push(user);
        return accountNumber;
      }
    }
  
    transferToBankAccount(user, amount) {
      if(user instanceof User) {
        const found = this.users.some(usr => user === usr);
        if(found) {
          if(user.balance >= amount) {
            const account = this.bankAccounts.find(acc => acc.userId === user.id);
            account.balance += amount;
            user.balance -= amount;
          }
        }
      }
    }
  
    transferFromBankAccount(user, amount) {
      if(user instanceof User) {
        const found = this.users.some(usr => user === usr);
        if(found) {
          const account = this.bankAccounts.find(acc => acc.userId === user.id);
          if(account.balance >= amount) {
            user.balance += amount;
            account.balance -= amount;
          }
        }
      }
    }
  
    transaction(from, to, amount) {
      let fromAccount = this.bankAccounts.find(acc => acc.accountNumber === from);
      let toAccount = this.bankAccounts.find(acc => acc.accountNumber === to);
  
      if(fromAccount && toAccount) {
        if(fromAccount.balance >= amount) {
          fromAccount.balance -= amount;
          toAccount.balance += amount;
        }
      }
    }
  
  }
  
  class BankAccount {
    id;
    userId;
    accountNumber;
    balance;
    bank;
    ownerName;
  
    constructor(id, userId, accountNumber, balance = 0, bank, ownerName) {
      this.id = id;
      this.userId = userId;
      this.balance = balance;
      this.accountNumber = accountNumber;
      this.bank = bank;
      this.ownerName = ownerName;
    }
  }