export type Term = {
  term: number;
  amount: number;
};

export type FinancingDetail = {
  down_payment: number;
  terms: Term[];
};

export type Expense = {
  description: string;
  amount: string;
};

export type Product = {
  _id: string;
  name: string;
  headline: string;
  description: string;
  details: string[];
  price: number;
  images: string[];
  financing_details: FinancingDetail;
  is_feature: boolean;
  is_sold: boolean;
  is_active: boolean;
  purchase_price: number;
  expenses: Expense[];
  total_expenses: number;
  sold_price: number;
  agent_commission: number;
};
