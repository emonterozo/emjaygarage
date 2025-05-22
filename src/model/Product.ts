import mongoose from 'mongoose';

const Product = new mongoose.Schema({
  plate: String,
  name: String,
  description: String,
  details: [String],
  price: { type: Number, default: 0 },
  images: [String],
  financing_details: {
    down_payment: { type: Number, default: 0 },
    terms: [
      {
        term: { type: Number, default: 0 },
        amount: { type: Number, default: 0 },
      },
    ],
  },
  is_feature: { type: Boolean, default: false },
  is_own_unit: { type: Boolean, default: false },
  is_sold: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  purchase_price: { type: Number, default: 0 },
  expenses: [
    {
      description: String,
      amount: { type: Number, default: 0 },
      category: String,
    },
  ],
  total_expenses: { type: Number, default: 0 },
  sold_price: { type: Number, default: 0 },
  sales_incentive: { type: Number, default: 0 },
  profit: { type: Number },
  percentage: { type: Number },
  days_on_hold: { type: Number },
  date_acquired: Date,
  date_sold: Date,
  acquired_city: String,
});

export default mongoose.models.Product || mongoose.model('Product', Product);
