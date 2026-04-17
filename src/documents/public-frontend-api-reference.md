# Tài liệu API Public cho Frontend

## Mục đích

Tài liệu này là **file index tổng** cho FE khi tích hợp các API public hiện có của backend.

Mục tiêu:

- nhìn nhanh toàn bộ public API đang có
- biết module chi tiết nằm ở đâu
- biết source type/backend file gốc nằm ở đâu
- biết bản copy để đọc nhanh trong `documents/public-apis/.../source-types/` nằm ở đâu

Tài liệu chi tiết theo module:

- [Galleries](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/galleries/README.md)
- [Projects](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/README.md)
- [Blogs](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/README.md)
- [Packages](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/packages/README.md)
- [Orders](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/orders/README.md)
- Shared types/common notes:
  - [Shared README](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/shared/README.md)
  - [Shared source-types](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/shared/source-types)

## Response envelope chung

Backend dùng success envelope chung cho các public API:

```ts
{
  success: true;
  data: unknown;
  message: string;
  error: null;
  statusCode: number;
  timestamp: string;
  path: string;
  requestId: string;
}
```

FE nên luôn unwrap `data` từ envelope này, không parse response như raw DTO trần.

## Pagination chung

Các public list endpoint có pagination hiện tại dùng shape:

```ts
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

Default runtime hiện tại:

```ts
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
} as const;
```

File gốc backend:

- `src/core/application/common/pagination.interface.ts`
- `src/common/constants/query.constants.ts`

Bản copy để FE đọc nhanh:

- [pagination.interface.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/shared/source-types/pagination.interface.ts)
- [query.constants.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/shared/source-types/query.constants.ts)

## Danh sách public API trong scope tài liệu này

1. `GET /api/v1/galleries/public`
2. `GET /api/v1/projects/public`
3. `GET /api/v1/projects/public/:id`
4. `GET /api/v1/blogs/public`
5. `GET /api/v1/blogs/public/:id`
6. `GET /api/v1/packages/public`
7. `POST /api/v1/orders/public/request`
8. `POST /api/v1/orders/public/confirm`

## Ghi chú nhanh theo module

### Galleries

- Public galleries hiện đã có pagination.
- Response item trả `name` là **localized string**, không phải multilingual object.

### Projects

- Public list bắt buộc có `galleryId`.
- Public list theo gallery vẫn strict: gallery invalid/missing/inactive/deleted sẽ fail, không fallback.
- Public detail dùng `EditorJsOutputData` cho `content`.
- Public detail có thể trả `gallery = null` nếu gallery liên quan không còn tồn tại.

### Blogs

- Blog là single-language.
- Public detail cũng dùng `EditorJsOutputData`.

### Packages

- Public list dùng `Accept-Language` để localize `name` và `bestFor`.
- `duration` vẫn là raw seconds.

### Orders

- `public/request` chỉ tạo Redis draft + gửi email confirm.
- `public/request` yêu cầu thêm `phoneNumber`.
- `phoneNumber` được backend normalize về E.164 cho `order.customerInfo.phoneNumber`.
- `public/confirm` lần đầu mới tạo order thật.
- Repeated confirm cùng token trong consumed-state TTL không tạo order mới.
- FE **không** gửi `requestDraftId`.
- FE **không** gửi `pricing`.
- Package item dùng `item.pricing` là field UI chính.
- Custom item dùng `item.budget` là field UI chính.

## Cách đọc bộ tài liệu này

Với mỗi module:

- `README.md`: mô tả tiếng Việt để FE hiểu contract và semantics
- `source-types/`: bản copy file backend gốc để FE mở xem nhanh

Mỗi README đều ghi rõ:

- file backend gốc nằm ở đâu
- bản copy trong `documents` nằm ở đâu
