import React from 'react';
import { notFound } from 'next/navigation';
import { UnitForm } from '@/components';

type AdminAddPageProps = {
  params: {
    key: string;
  };
};

const NEXT_PUBLIC_ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

export default async function AdminAddPage({ params }: AdminAddPageProps) {
  const { key } = await params;

  if (key !== NEXT_PUBLIC_ADMIN_KEY) return notFound();

  return <UnitForm />;
}
