export class PublicGalleryItemOutput {
  id!: string;
  name!: string;
}

export type PaginatedPublicGalleryOutput = {
  items: PublicGalleryItemOutput[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
