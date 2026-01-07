'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { z } from 'zod';

export function useSearch<TSchema extends z.ZodObject>(schema: TSchema) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Normalize raw params
  const raw = useMemo(() => {
    const obj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }, [searchParams]);

  // 2. Safe parse (NO throw)
  const result = useMemo(() => {
    return schema.safeParse(raw);
  }, [schema, raw]);

  // 3. Final parsed value
  const parsed = useMemo(() => {
    if (result.success) return result.data;

    // IMPORTANT:
    // gunakan partial + safeParse untuk ambil default tanpa error
    const fallback = schema
      .partial()
      .safeParse(raw);

    return fallback.success ? fallback.data : {};
  }, [schema, result, raw]);

  // 4. Prevent infinite replace
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    if (hasSyncedRef.current) return;

    const newParams = new URLSearchParams(searchParams);
    let changed = false;

    Object.entries(parsed as Record<string, unknown>).forEach(([key, value]) => {
      if (value !== undefined && !searchParams.has(key)) {
        newParams.set(key, String(value));
        changed = true;
      }
    });

    if (changed) {
      hasSyncedRef.current = true;
      router.replace(`${pathname}?${newParams.toString()}`);
    }
  }, [parsed, pathname, router, searchParams]);

  return parsed as z.output<TSchema>;
}
