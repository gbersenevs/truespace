import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
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
    const { courseId } = body;

    const user = await User.findById(userData.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Проверка, есть ли уже курс в избранном
    const index = user.favorites.indexOf(courseId);
    
    if (index > -1) {
      // Удаление из избранного
      user.favorites.splice(index, 1);
    } else {
      // Добавление в избранное
      user.favorites.push(courseId);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      favorites: user.favorites,
      message: index > -1 ? 'Removed from favorites' : 'Added to favorites',
    });
  } catch (error: any) {
    console.error('Toggle favorite error:', error);
    return NextResponse.json(
      { error: 'Failed to toggle favorite', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const userData = await getUserFromRequest(request);
    if (!userData) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await User.findById(userData.userId).populate('favorites');
    
    return NextResponse.json({
      success: true,
      favorites: user?.favorites || [],
    });
  } catch (error: any) {
    console.error('Get favorites error:', error);
    return NextResponse.json(
      { error: 'Failed to get favorites', details: error.message },
      { status: 500 }
    );
  }
}

