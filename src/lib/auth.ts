import { cookies } from 'next/headers';
import connectDatabase from './connectDatabase';
import Product from '@/model/Product';

export async function getUserFromCookie() {
  const cookie = (await cookies()).get('auth');
  if (!cookie || cookie.value !== 'true') return null;

  await connectDatabase();

  const user = await Product.findOne({}).lean();

  const data = JSON.parse(JSON.stringify(user));

  return user ? { _id: data.id, username: data.username, type: data.type } : null;
}
