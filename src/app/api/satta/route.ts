import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth'; // Assuming @ refers to src folder
import { DailyValue } from '@/models/DailyValue';
import connectDB from '@/lib/db';

export async function POST(request: Request) {
  await connectDB();
  const authResult = await verifyAuth();

  if (!authResult) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

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
});

  return NextResponse.json({ message: 'Successfully processed POST request', user: authResult, dailyValues });
} 