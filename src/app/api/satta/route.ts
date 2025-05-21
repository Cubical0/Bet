import { NextResponse } from 'next/server';
import { DailyValue } from '@/models/DailyValue';
import connectDB from '@/lib/db';

export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();
  const { month, year } = body;

  const startDate = new Date(`${year}-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);

  const dailyValues = await DailyValue.find({
    date: {
      $gte: startDate,
      $lt: endDate
    }
  }).lean();

  // Convert date/value to simplified array format and ensure values are padded strings
  const data = dailyValues.map(entry => ({
    date: entry.date,
    value: String(entry.value).padStart(2, '0')
  }));

  return NextResponse.json({ message: 'Success', data });
}
