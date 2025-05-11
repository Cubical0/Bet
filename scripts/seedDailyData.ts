import * as dotenv from 'dotenv';
dotenv.config();

import { DailyValue } from '../src/models/DailyValue';
import fs from 'fs';
const connectDB = require('../src/lib/db').default;

async function seed() {
  await connectDB();
  const data = JSON.parse(fs.readFileSync('./scripts/data.json', 'utf-8'));

  await DailyValue.deleteMany({});
  await DailyValue.insertMany(data);

  console.log('✅ Data successfully seeded');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Error seeding data:', err);
  process.exit(1);
});
