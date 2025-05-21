// app/api/daily-value/route.ts
import { NextResponse } from 'next/server';
import { DailyValue } from '@/models/DailyValue';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

export async function PUT(request: Request) {
  try {
    await connectDB();

    // Parse and validate request body
    const body = await request.json();
    let { number } = body;

    // Convert to string and ensure it's padded with leading zero if single digit
    number = String(number).padStart(2, '0');

    // Validate the input format
    if (!/^[0-9]{2}$/.test(number)) {
      return NextResponse.json(
        { message: 'Input must be 2 digits' },
        { status: 400 }
      );
    }

    // Validate the numeric range
    const numValue = parseInt(number, 10);
    if (numValue < 0 || numValue > 100) {
      return NextResponse.json(
        { message: 'Number must be between 00 and 100' },
        { status: 400 }
      );
    }

    // Normalize today's date to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if a DailyValue already exists for today
    let dailyValue = await DailyValue.findOne({
      date: { $gte: today, $lt: tomorrow },
    });

    if (!dailyValue) {
      // Create new entry if none exists
      dailyValue = new DailyValue({ 
        date: today, 
        value: number 
      });
      await dailyValue.save();
      
      // Convert to plain object and ensure getters are applied
      const savedValue = dailyValue.toObject({ getters: true, virtuals: true });
      
      return NextResponse.json(
        { 
          message: 'Successfully created new daily value', 
          dailyValue: {
            ...savedValue,
            value: String(savedValue.value).padStart(2, '0')
          }
        },
        { status: 201 }
      );
    }

    // Update existing entry
    dailyValue.value = number;
    await dailyValue.save();
    
    // Convert to plain object and ensure getters are applied
    const updatedValue = dailyValue.toObject({ getters: true, virtuals: true });

    return NextResponse.json(
      { 
        message: 'Successfully updated daily value', 
        dailyValue: {
          ...updatedValue,
          value: String(updatedValue.value).padStart(2, '0')
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[PUT /api/daily-value]', error);
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
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
        { date: { $gte: today, $lt: tomorrow } },
      ],
    }).sort({ date: 1 }).lean();

    // Ensure all values are padded strings
    const formattedData = dailyValuedata.map(item => ({
      ...item,
      value: String(item.value).padStart(2, '0')
    }));

    return NextResponse.json(
      { 
        message: 'Successfully fetched daily value for today and yesterday', 
        dailyValuedata: formattedData 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[GET /api/daily-value]', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
