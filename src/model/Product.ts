import mongoose from 'mongoose';

const Product = new mongoose.Schema({
  name: String,
  headline: String,
  details: [String],
  price: Number,
  images: [String],
  financing_details: {
    down_payment: Number,
    terms: { term: Number, amount: Number },
  },
  is_feature: Boolean,
  is_sold: Boolean,
  is_active: Boolean,
  purchase_price: Number,
  expenses: [{ description: String, amount: Number }],
  total_expenses: Number,
  sold_price: Number,
  agent_commission: Number,
});

export default mongoose.models.Product || mongoose.model('Product', Product);
