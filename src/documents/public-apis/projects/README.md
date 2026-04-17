# Public API - Projects

## APIs trong module này

1. `GET /api/v1/projects/public`
2. `GET /api/v1/projects/public/:id`

## 1. Public - List Projects By Gallery

- **Method**: `GET`
- **URL**: `/api/v1/projects/public`
- **Mục đích**: lấy danh sách project public theo gallery
- **Auth**: không cần auth
- **Response message**: `Projects fetched successfully`

### Query params

- `galleryId: string` bắt buộc
- `page?: number`
- `limit?: number`

### Runtime behavior

- runtime check gallery trước:
  - gallery phải tồn tại
  - phải active
  - không bị deleted
- chỉ trả project public theo gallery đó
- response item là tối giản:
  - `id`
  - localized `name`
  - `coverImage`

### Request DTO

File gốc backend:

- `src/modules/projects/presentation/http/dto/list-public-projects.query.ts`

Bản copy:

- [list-public-projects.query.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/list-public-projects.query.ts)

### Input DTO

File gốc backend:

- `src/modules/projects/application/dto/list-public-projects-by-gallery.input.ts`

Bản copy:

- [list-public-projects-by-gallery.input.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/list-public-projects-by-gallery.input.ts)

### Response DTO

File gốc backend:

- `src/modules/projects/presentation/http/dto/public-project.response.ts`

Bản copy:

- [public-project.response.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/public-project.response.ts)

Code load-bearing:

```ts
export class PublicProjectItemResponse {
  id!: string;
  name!: string;
  coverImage!: PublicProjectCoverImageResponse;
}

export class PublicProjectListResponse implements PaginatedResult<PublicProjectItemResponse> {
  items!: PublicProjectItemResponse[];
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

- `src/modules/projects/application/dto/public-project.output.ts`
- `src/modules/projects/application/use-cases/list-public-projects-by-gallery.use-case.ts`
- `src/modules/projects/presentation/http/project.presenter.ts`
- `src/modules/projects/presentation/http/project.controller.ts`

Bản copy:

- [public-project.output.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/public-project.output.ts)
- [list-public-projects-by-gallery.use-case.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/list-public-projects-by-gallery.use-case.ts)
- [project.presenter.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/project.presenter.ts)
- [project.controller.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/project.controller.ts)

### Lưu ý tích hợp FE

- FE bắt buộc phải có `galleryId`.
- Nếu `galleryId` invalid/inactive/deleted, backend sẽ fail.
- Endpoint này giữ strict semantics theo gallery context, không có fallback khi gallery invalid/missing.
- `name` trong response item là localized string, không phải multilingual object.
- `coverImage` đã là expanded object đủ để render thumbnail.

---

## 2. Public - Get Project Detail

- **Method**: `GET`
- **URL**: `/api/v1/projects/public/:id`
- **Mục đích**: lấy detail của một project public
- **Auth**: không cần auth
- **Response message**: `Project fetched successfully`

### Path params

- `id: string`

### Request/input liên quan

File gốc backend:

- `src/modules/projects/application/use-cases/get-public-project.use-case.ts`

Bản copy:

- [get-public-project.use-case.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/get-public-project.use-case.ts)

Type input trong use-case:

```ts
type GetPublicProjectInput = {
  id: string;
  locale: SupportedLocale;
};
```

### Response DTO

File gốc backend:

- `src/modules/projects/presentation/http/dto/public-project.response.ts`

Bản copy:

- [public-project.response.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/public-project.response.ts)

Code load-bearing:

```ts
export class PublicProjectResponse {
  id!: string;
  gallery!: PublicProjectGalleryResponse | null;
  name!: string;
  coverImage!: PublicProjectCoverImageResponse;
  content!: EditorJsOutputData;
  createdAt!: Date;
  updatedAt!: Date;
}
```

### Related types

File gốc backend:

- `src/modules/projects/application/dto/public-project.output.ts`
- `src/modules/projects/projects.types.ts`

Bản copy:

- [public-project.output.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/public-project.output.ts)
- [projects.types.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/projects.types.ts)

### Giải thích `EditorJsOutputData`

`EditorJsOutputData` là type quan trọng của project detail.

File gốc backend:

- `src/modules/projects/projects.types.ts`

Bản copy:

- [projects.types.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/projects/source-types/projects.types.ts)

Code liên quan:

```ts
export type EditorJsBlock = {
  id?: string;
  type: string;
  data: Record<string, unknown>;
};

export type EditorJsOutputData = {
  time?: number;
  version?: string;
  blocks: EditorJsBlock[];
};
```

FE cần hiểu practical:

- đây là whole Editor.js document
- `blocks` là phần quan trọng nhất để render
- backend không convert sang HTML
- FE phải dùng renderer/adapter theo schema block hiện có
- `content` của project detail không phải plain text string

### Lưu ý tích hợp FE

- `gallery.name` trong public detail là localized string.
- Nếu gallery liên quan đã bị xóa/không còn tồn tại, `gallery` sẽ là `null` và API vẫn trả detail thành công.
- `name` của project cũng là localized string.
- Không assume public detail có `isPublished`, `isActive`, `deletedAt`, `createdBy`.
