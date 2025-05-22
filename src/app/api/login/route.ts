import { NextRequest, NextResponse } from 'next/server';
import connectDatabase from '@/lib/connectDatabase';
import Account from '@/model/Account';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDatabase();

    const body: { username: string; password: string } = await request.json();

    const user = await Account.findOne({ username: body.username });

    if (!user)
      return NextResponse.json({ message: 'Incorrect username or password' }, { status: 401 });

    const isMatch = await bcrypt.compare(body.password, user.password);

    console.log(isMatch);

    if (!isMatch) {
      return NextResponse.json({ message: 'Incorrect username or password' }, { status: 401 });
    }

    const cookie = serialize('auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      secure: true,
    });

    const response = NextResponse.json({ message: 'Login successfully' }, { status: 200 });
    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
