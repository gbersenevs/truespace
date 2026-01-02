import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PromoCode from '@/models/PromoCode';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const userData = await getUserFromRequest(request);
    if (!userData || userData.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { code, maxUses, expiresAt, description } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }

    // Check if code already exists
    const existingCode = await PromoCode.findOne({ code: code.toUpperCase() });
    if (existingCode) {
      return NextResponse.json(
        { error: 'Promo code already exists' },
        { status: 400 }
      );
    }

    const promoCode = await PromoCode.create({
      code: code.toUpperCase(),
      maxUses: maxUses || -1,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      description: description || '',
      createdBy: userData.userId,
    });

    return NextResponse.json(
      {
        success: true,
        promoCode,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create promo code error:', error);
    return NextResponse.json(
      { error: 'Failed to create promo code', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userData = await getUserFromRequest(request);
    if (!userData || userData.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const promoCodes = await PromoCode.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');

    return NextResponse.json({
      success: true,
      promoCodes,
    });
  } catch (error: any) {
    console.error('Get promo codes error:', error);
    return NextResponse.json(
      { error: 'Failed to get promo codes', details: error.message },
      { status: 500 }
    );
  }
}

