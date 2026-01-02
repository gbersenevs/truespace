import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import PromoCode from '@/models/PromoCode';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }

    // Проверка пользователя
    const user = await User.findById(userData.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Проверка, что пользователь еще не использовал промокод
    if (user.hasAccessToCourses) {
      return NextResponse.json(
        { error: 'You already have access to courses' },
        { status: 400 }
      );
    }

    // Поиск промокода
    const promoCode = await PromoCode.findOne({ 
      code: code.toUpperCase() 
    });

    if (!promoCode) {
      return NextResponse.json(
        { error: 'Invalid promo code' },
        { status: 404 }
      );
    }

    // Проверка активности промокода
    if (!promoCode.isActive) {
      return NextResponse.json(
        { error: 'This promo code is no longer active' },
        { status: 400 }
      );
    }

    // Проверка лимита использований
    if (promoCode.maxUses !== -1 && promoCode.currentUses >= promoCode.maxUses) {
      return NextResponse.json(
        { error: 'This promo code has reached its usage limit' },
        { status: 400 }
      );
    }

    // Проверка срока действия
    if (promoCode.expiresAt && promoCode.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'This promo code has expired' },
        { status: 400 }
      );
    }

    // Активация доступа для пользователя
    user.hasAccessToCourses = true;
    user.usedPromoCode = code.toUpperCase();
    await user.save();

    // Увеличение счетчика использований промокода
    promoCode.currentUses += 1;
    await promoCode.save();

    return NextResponse.json({
      success: true,
      message: 'Promo code activated successfully!',
      hasAccessToCourses: true,
    });
  } catch (error: any) {
    console.error('Promo code validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate promo code', details: error.message },
      { status: 500 }
    );
  }
}

