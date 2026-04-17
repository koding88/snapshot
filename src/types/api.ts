export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error: string | null;
  statusCode: number;
  timestamp: string;
  path: string;
  requestId: string;
}

export interface PaginatedData<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface FileInfo {
  id: string;
  url: string;
  mimeType: string;
  size: number;
  originalName: string;
}
