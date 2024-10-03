export interface ICurrency {
  code: string;
  label: string;
  sign: string;
}

export const Currencies: ICurrency[] = [
  { code: "USD", label: "US Dollar", sign: "$" },
  { code: "EUR", label: "Euro", sign: "€" },
  { code: "GBP", label: "British Pound", sign: "£" },
  { code: "PLN", label: "Polish Złoty", sign: "zł" },
  { code: "UAH", label: "Ukrainian Hryvnia", sign: "₴" },
];
