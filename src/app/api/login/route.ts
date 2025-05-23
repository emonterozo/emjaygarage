import { NextRequest, NextResponse } from 'next/server';
import connectDatabase from '@/lib/connectDatabase';
import Account from '@/model/Account';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDatabase();

    const body: { username: string; password: string } = await request.json();

    const user = await Account.findOne({ username: body.username });

    if (!user)
      return NextResponse.json({ message: 'Incorrect username or password.' }, { status: 401 });

    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Incorrect username or password.' }, { status: 401 });
    }

    const cookie = serialize('auth_user_id', user._id.toString(), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      secure: true,
    });

    const response = NextResponse.json(
      {
        message: 'Login successfully',
        user: {
          _id: user._id.toString(),
          username: user.username,
          type: user.type,
        },
      },
      { status: 200 },
    );
    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET() {
  const cookie = (await cookies()).get('auth_user_id');

  if (!cookie) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const id = cookie.value;
  await connectDatabase();

  const user = await Account.findById(id).lean();

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const data = JSON.parse(JSON.stringify(user));

  return NextResponse.json({
    user: {
      _id: data._id,
      username: data.username,
      type: data.type,
    },
  });
}
