import mongoose from 'mongoose';

const dailyValueSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  value: {
    type: String,
    required: true,
    get: (v: string) => v,
    set: (v: string | number) => {
      // Convert to string and ensure it's padded with leading zero
      const strValue = String(v).padStart(2, '0');
      return strValue;
    },
    validate: {
      validator: function(v: string) {
        // Validate that the string is a number between 00 and 100
        const num = parseInt(v, 10);
        return /^[0-9]{2}$/.test(v) && num >= 0 && num <= 100;
      },
      message: 'Value must be a string representing a number between 00 and 100'
    }
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Add a pre-save middleware to ensure value is always stored as a string
dailyValueSchema.pre('save', function(next) {
  if (this.value) {
    this.value = String(this.value).padStart(2, '0');
  }
  next();
});

export const DailyValue = mongoose.models.DailyValue || mongoose.model('DailyValue', dailyValueSchema);
