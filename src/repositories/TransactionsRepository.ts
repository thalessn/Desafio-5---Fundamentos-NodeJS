import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // Retornar um Balance
    const incomes = this.transactions.reduce((total, element) => {
      if (element.type === 'income') return total + element.value;
      return total;
    }, 0);

    const outcomes = this.transactions.reduce((total, element) => {
      if (element.type === 'outcome') return total + element.value;
      return total;
    }, 0);

    const total = incomes - outcomes;

    const balance = {
      income: incomes,
      outcome: outcomes,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
