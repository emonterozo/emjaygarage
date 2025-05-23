import mongoose from 'mongoose';

const Account = new mongoose.Schema({
  username: String,
  password: String,
  type: String,
});

export default mongoose.models.Account || mongoose.model('Account', Account);
