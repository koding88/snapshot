import type { FileInfo } from '@/types';

export interface Package {
  id: string;
  name: string;
  bestFor: string;
  duration: number;
  photoCount: number;
  pricing: {
    amount: number;
    currency: string;
  };
  coverImage: FileInfo;
}
