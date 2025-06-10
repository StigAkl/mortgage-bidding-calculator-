import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("nb-NO").format(value);

export function formatNumberForInput(value: number): string {
  if (isNaN(value) || value === 0) return "";
  return new Intl.NumberFormat("nb-NO").format(value);
}

export const parseFormattedNumber = (value: string) => {
  const cleanValue = value.replace(/\s/g, "").replace(/[^\d,.]/g, "");
  const normalizedValue = cleanValue.replace(",", ".");
  const parsed = Number.parseFloat(normalizedValue);
  return isNaN(parsed) ? 0 : parsed;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function calculateMonthlyPayment(
  principal: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  const loanTermMonths = loanTermYears * 12;

  if (monthlyInterestRate === 0) {
    return principal / loanTermMonths;
  }

  const monthlyPayment =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
    (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

  return monthlyPayment;
}
