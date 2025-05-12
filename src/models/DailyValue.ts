import mongoose from 'mongoose';

const dailyValueSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  value: {
    type: Number,
    required: true
  }
});

export const DailyValue = mongoose.models.DailyValue || mongoose.model('DailyValue', dailyValueSchema);
