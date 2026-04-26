import type { PaginationParams } from '@/types';

export const queryKeys = {
  galleries: {
    all: ['galleries'] as const,
    public: (params?: PaginationParams) =>
      [...queryKeys.galleries.all, 'public', params] as const,
  },

  projects: {
    all: ['projects'] as const,
    public: (params: { galleryId: string } & PaginationParams) =>
      [...queryKeys.projects.all, 'public', params] as const,
    publicDetail: (id: string) =>
      [...queryKeys.projects.all, 'public', id] as const,
  },

  blogs: {
    all: ['blogs'] as const,
    public: (params?: PaginationParams) =>
      [...queryKeys.blogs.all, 'public', params] as const,
    publicDetail: (id: string) =>
      [...queryKeys.blogs.all, 'public', id] as const,
  },

  packages: {
    all: ['packages'] as const,
    public: (params?: PaginationParams) =>
      [...queryKeys.packages.all, 'public', params] as const,
  },
  siteSettings: {
    all: ['siteSettings'] as const,
    public: () => [...queryKeys.siteSettings.all, 'public'] as const,
  },
} as const;
