# Public API - Galleries

## APIs trong module này

1. `GET /api/v1/galleries/public`

## 1. Get Public Galleries

- **Method**: `GET`
- **URL**: `/api/v1/galleries/public`
- **Mục đích**: lấy danh sách gallery public để hiển thị cho app public/customer-facing
- **Auth**: không cần auth
- **Response message**: `Galleries fetched successfully`

### Query params

- `page?: number`
- `limit?: number`

### Runtime behavior

- chỉ lấy gallery:
  - `isActive = true`
  - `deletedAt = null`
- có pagination theo pattern chung của repo
- default hiện tại:
  - `page = 1`
  - `limit = 10`
- `name` trả về là **localized string**
- locale lấy từ `Accept-Language`

### Request DTO

File gốc backend:
- `src/modules/galleries/presentation/http/dto/list-public-galleries.query.ts`

Bản copy:
- [list-public-galleries.query.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/galleries/source-types/list-public-galleries.query.ts)

### Input DTO

File gốc backend:
- `src/modules/galleries/application/dto/list-public-galleries.input.ts`

Bản copy:
- [list-public-galleries.input.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/galleries/source-types/list-public-galleries.input.ts)

### Response DTO

File gốc backend:
- `src/modules/galleries/presentation/http/dto/public-gallery.response.ts`

Bản copy:
- [public-gallery.response.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/galleries/source-types/public-gallery.response.ts)

Code load-bearing:

```ts
export class PublicGalleryResponse {
  id!: string;
  name!: string;
}

export class PublicGalleryListResponse implements PaginatedResult<PublicGalleryResponse> {
  items!: PublicGalleryResponse[];
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
- `src/modules/galleries/application/dto/public-gallery-item.output.ts`
- `src/modules/galleries/application/use-cases/list-public-galleries.use-case.ts`
- `src/modules/galleries/presentation/http/gallery.presenter.ts`
- `src/modules/galleries/presentation/http/gallery.controller.ts`

Bản copy:
- [public-gallery-item.output.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/galleries/source-types/public-gallery-item.output.ts)
- [list-public-galleries.use-case.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/galleries/source-types/list-public-galleries.use-case.ts)
- [gallery.presenter.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/galleries/source-types/gallery.presenter.ts)
- [gallery.controller.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/galleries/source-types/gallery.controller.ts)

### Lưu ý tích hợp FE

- FE nên truyền `Accept-Language` nếu muốn locale đúng.
- FE không nên assume response trả multilingual object cho `name`.
- Shape đúng để render list là:

```ts
{
  items: Array<{
    id: string;
    name: string;
  }>;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

- Nếu FE chỉ cần dropdown/list đơn giản, chỉ cần dùng `data.items`.

