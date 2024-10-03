import { Colors } from "@/constants/Colors";
export interface ICategory {
  id: number;
  name: string;
  color: string;
}

export const CategoriesData: ICategory[] = [
  {
    id: 1,
    name: "Housing",
    color: Colors.darkBlue,
  },
  {
    id: 2,
    name: "Transportation",
    color: Colors.blue,
  },
  {
    id: 3,
    name: "Groceries",
    color: Colors.lightBlue,
  },
  {
    id: 4,
    name: "Health & Fitness",
    color: Colors.azure,
  },
  {
    id: 5,
    name: "Insurance",
    color: Colors.darkGreen,
  },
  {
    id: 6,
    name: "Entertainment",
    color: Colors.green,
  },
  {
    id: 7,
    name: "Personal Care",
    color: Colors.yellow,
  },
  {
    id: 8,
    name: "Taxes",
    color: Colors.darkYellow,
  },
  {
    id: 9,
    name: "Debt & Loans",
    color: Colors.beige,
  },
  {
    id: 10,
    name: "Savings & Investments",
    color: Colors.orange,
  },
  {
    id: 11,
    name: "Travel",
    color: Colors.mandarin,
  },
  {
    id: 12,
    name: "Pets",
    color: Colors.brightRed,
  },
  {
    id: 13,
    name: "Childcare & Education",
    color: Colors.red,
  },
  {
    id: 14,
    name: "Subscriptions & Memberships",
    color: Colors.brightPink,
  },
  {
    id: 15,
    name: "Dining Out",
    color: Colors.pink,
  },
  {
    id: 17,
    name: "Equipment & Gear",
    color: Colors.lightPurple,
  },
  {
    id: 18,
    name: "Unhealthy & Habits",
    color: Colors.purple,
  },
  {
    id: 16,
    name: "Other",
    color: Colors.darkPurple,
  },
];
