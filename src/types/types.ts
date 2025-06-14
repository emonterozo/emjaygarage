export type Term = {
  _id: string;
  term: number;
  amount: number;
};

export type FinancingDetail = {
  down_payment: number;
  terms: Term[];
};

export type Expense = {
  _id: string;
  description: string;
  amount: string;
  category: string;
};

export type Product = {
  _id: string;
  plate: string;
  name: string;
  description: string;
  details: string[];
  price: number;
  images: string[];
  financing_details: FinancingDetail;
  is_feature: boolean;
  is_own_unit: boolean;
  is_sold: boolean;
  is_active: boolean;
  purchase_price: number;
  expenses: Expense[];
  total_expenses: number;
  sold_price: number;
  sales_incentive: number;
  date_acquired: Date;
  date_sold: Date;
  acquired_city: string;
  profit: number;
  percentage: number;
  days_on_hold: number;
};

export type DashboardItem = {
  _id: string;
  name: string;
  plate: string;
  total_expenses: number;
  sold_price: number;
  profit: number;
  percentage: number;
  days_on_hold: number;
  is_sold: boolean;
  is_active: boolean;
  date_acquired: Date;
  date_sold: Date;
};

export type Account = {
  username: string;
  password: string;
  type: string;
};
