export type PublicPackageCoverImageOutput = {
  id: string;
  url: string;
  mimeType: string;
  size: number;
  originalName: string | null;
};

export type PublicPackageOutput = {
  id: string;
  name: string;
  bestFor: string;
  duration: number;
  photoCount: number;
  pricing: {
    amount: number;
    currency: string;
  };
  coverImage: PublicPackageCoverImageOutput;
  createdAt: Date;
  updatedAt: Date;
};

export type PaginatedPublicPackagesOutput = {
  items: PublicPackageOutput[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
