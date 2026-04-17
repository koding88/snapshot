# Public API - Packages

## APIs trong module này

1. `GET /api/v1/packages/public`

## 1. Public - List Packages

- **Method**: `GET`
- **URL**: `/api/v1/packages/public`
- **Mục đích**: lấy danh sách package public có pagination
- **Auth**: không cần auth
- **Response message**: `Packages fetched successfully`

### Query params

- `page?: number`
- `limit?: number`

### Runtime behavior

- runtime localize `name` và `bestFor` theo `Accept-Language`
- chỉ lấy:
  - active
  - non-deleted
- `duration` vẫn là raw seconds
- `pricing` là raw money object

### Request DTO

File gốc backend:
- `src/modules/packages/presentation/http/dto/list-public-packages.query.ts`

Bản copy:
- [list-public-packages.query.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/packages/source-types/list-public-packages.query.ts)

### Input DTO

File gốc backend:
- `src/modules/packages/application/dto/list-public-packages.input.ts`

Bản copy:
- [list-public-packages.input.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/packages/source-types/list-public-packages.input.ts)

### Response DTO

File gốc backend:
- `src/modules/packages/presentation/http/dto/public-package.response.ts`

Bản copy:
- [public-package.response.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/packages/source-types/public-package.response.ts)

Code load-bearing:

```ts
export class PublicPackageResponse {
  id!: string;
  name!: string;
  bestFor!: string;
  duration!: number;
  photoCount!: number;
  pricing!: PublicPackagePricingResponse;
  coverImage!: PublicPackageCoverImageResponse;
  createdAt!: Date;
  updatedAt!: Date;
}

export class PublicPackageListResponse implements PaginatedResult<PublicPackageResponse> {
  items!: PublicPackageResponse[];
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Related types / files

File gốc backend:
- `src/modules/packages/application/dto/public-package.output.ts`
- `src/modules/packages/application/use-cases/list-public-packages.use-case.ts`
- `src/modules/packages/presentation/http/package.presenter.ts`
- `src/modules/packages/presentation/http/package.controller.ts`

Bản copy:
- [public-package.output.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/packages/source-types/public-package.output.ts)
- [list-public-packages.use-case.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/packages/source-types/list-public-packages.use-case.ts)
- [package.presenter.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/packages/source-types/package.presenter.ts)
- [package.controller.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/packages/source-types/package.controller.ts)

### Lưu ý tích hợp FE

- `name` và `bestFor` trong public response là localized string, không phải multilingual object.
- `duration` là số giây raw; FE tự format khi hiển thị.
- `pricing` dùng trực tiếp để render giá.
- `coverImage` đã là expanded file object.

