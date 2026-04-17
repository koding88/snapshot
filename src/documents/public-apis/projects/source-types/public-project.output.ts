import type { EditorJsOutputData } from '../../projects.types';

export type PublicProjectCoverImageOutput = {
  id: string;
  url: string;
  mimeType: string;
  size: number;
  originalName: string | null;
};

export type PublicProjectItemOutput = {
  id: string;
  name: string;
  coverImage: PublicProjectCoverImageOutput;
};

export type PublicProjectOutput = {
  id: string;
  gallery: {
    id: string;
    name: string;
  } | null;
  name: string;
  coverImage: PublicProjectCoverImageOutput;
  content: EditorJsOutputData;
  createdAt: Date;
  updatedAt: Date;
};

export type PaginatedPublicProjectsOutput = {
  items: PublicProjectItemOutput[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
