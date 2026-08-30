import { base44 } from '@/api/base44Client';
export const User = {
  me: async () => {
    try { return await base44.auth.me(); } catch { return null; }
  }
};
