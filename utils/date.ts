import { IDailyExpenses, IExpense } from "@/modals/expenses.model";

export function getFormattedDate(date: string) {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`;
}

export function getDateMinusDays(date: string | Date, days: number) {
  const newDate = new Date(date);
  return new Date(
    newDate.getFullYear(),
    newDate.getMonth(),
    newDate.getDate() - days,
  );
}

export function groupExpensesByDays(expenses: IExpense[]): IDailyExpenses[] {
  const result = [];
  const today = new Date();
  const daysPassed = today.getDate();
  const thisMonthExpenses = expenses.filter((expense) => {
    const dateMonthAgo = getDateMinusDays(today, daysPassed);
    return new Date(expense.date) > dateMonthAgo;
  });

  for (let day = 0; day <= daysPassed; day++) {
    const curDate = getDateMinusDays(today, day);
    const expensesForTheDay = thisMonthExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getDate() === curDate.getDate();
    });

    if (expensesForTheDay.length > 0) {
      result.push({
        day: curDate,
        expenses: expensesForTheDay,
      });
    }
  }
  return result;
}

export function formatDate(date: string | Date) {
  date = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) {
    return "Today";
  } else if (isYesterday) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
}