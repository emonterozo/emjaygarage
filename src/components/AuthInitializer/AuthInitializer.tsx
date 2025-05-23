'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function AuthInitializer({ children }: Readonly<{ children: React.ReactNode }>) {
  const setUser = useAppStore((s) => s.setUser);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/login');

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
