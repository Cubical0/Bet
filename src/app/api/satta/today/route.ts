import { NextResponse } from 'next/server';
import { DailyValue } from '@/models/DailyValue';
import connectDB from '@/lib/db';

export async function PUT(request: Request) {
  await connectDB();

  // const authResult = await verifyAuth();
  // if (!authResult) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }

  const body = await request.json();
  const { number } = body;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let dailyValue = await DailyValue.findOne({
    date: { $gte: today, $lt: tomorrow },
  });

  if (!dailyValue) {
    dailyValue = new DailyValue({ date: today, value: number });
    await dailyValue.save();
    return NextResponse.json({ message: 'Successfully created new daily value', dailyValue });
  }

  dailyValue.value = number;
  await dailyValue.save();

  return NextResponse.json({ message: 'Successfully updated daily value', dailyValue });
}

export async function GET() {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayEnd = new Date(today);

  const dailyValuedata = await DailyValue.find({
    $or: [
      { date: { $gte: yesterday, $lt: yesterdayEnd } },
      { date: { $gte: today, $lt: tomorrow } }
    ]
  });

  return NextResponse.json({ message: 'Successfully fetched daily value for today and yesterday', dailyValuedata });
}
