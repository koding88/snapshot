# Public API - Blogs

## APIs trong module này

1. `GET /api/v1/blogs/public`
2. `GET /api/v1/blogs/public/:id`

## 1. Public - List Blogs

- **Method**: `GET`
- **URL**: `/api/v1/blogs/public`
- **Mục đích**: lấy danh sách blog public có pagination
- **Auth**: không cần auth
- **Response message**: `Blogs fetched successfully`

### Query params

- `page?: number`
- `limit?: number`

### Runtime behavior

- blogs public đọc locale từ `Accept-Language`
- fallback text hiện tại cho blogs public:
  - `requested locale`
  - rồi `en`
  - rồi `vi`
  - rồi `cn`
- `name` public response luôn là string đã localize sẵn
- `content` public detail cũng được localize sẵn ở các block text:
  - `paragraph.data.text`
  - `header.data.text`
  - `list.data.items`
- block tree là shared
- `mediaLayout` / image / youtube / layout metadata vẫn shared, không nhân bản theo locale
- runtime sort hiện tại:
  - pinned trước
  - rồi mới tới `createdAt desc`

### Request DTO

File gốc backend:

- `src/modules/blogs/presentation/http/dto/list-public-blogs.query.ts`

Bản copy:

- [list-public-blogs.query.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/list-public-blogs.query.ts)

### Input DTO

File gốc backend:

- `src/modules/blogs/application/dto/list-public-blogs.input.ts`

Bản copy:

- [list-public-blogs.input.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/list-public-blogs.input.ts)

### Response DTO

File gốc backend:

- `src/modules/blogs/presentation/http/dto/public-blog.response.ts`

Bản copy:

- [public-blog.response.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/public-blog.response.ts)

### Related types / files

File gốc backend:

- `src/modules/blogs/application/dto/public-blog.output.ts`
- `src/modules/blogs/application/use-cases/list-public-blogs.use-case.ts`
- `src/modules/blogs/presentation/http/blog.presenter.ts`
- `src/modules/blogs/presentation/http/blog.controller.ts`

Bản copy:

- [public-blog.output.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/public-blog.output.ts)
- [list-public-blogs.use-case.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/list-public-blogs.use-case.ts)
- [blog.presenter.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/blog.presenter.ts)
- [blog.controller.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/blog.controller.ts)

### Lưu ý tích hợp FE

- Đây là list paginated chuẩn `items + meta`.
- FE public không cần tự resolve localized object cho `name`.
- Chỉ cần gửi `Accept-Language` đúng locale mong muốn.

---

## 2. Public - Get Blog

- **Method**: `GET`
- **URL**: `/api/v1/blogs/public/:id`
- **Mục đích**: lấy detail của blog public
- **Auth**: không cần auth
- **Response message**: `Blog fetched successfully`

### Path params

- `id: string`

### Request/input liên quan

File gốc backend:

- `src/modules/blogs/application/use-cases/get-public-blog.use-case.ts`

Bản copy:

- [get-public-blog.use-case.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/get-public-blog.use-case.ts)

Runtime input:

```ts
execute(input: { id: string; locale: SupportedLocale }): Promise<PublicBlogOutput>
```

### Response DTO

File gốc backend:

- `src/modules/blogs/presentation/http/dto/public-blog.response.ts`

Bản copy:

- [public-blog.response.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/public-blog.response.ts)

Code load-bearing:

```ts
export class PublicBlogResponse {
  id!: string;
  name!: string;
  coverImage!: PublicBlogCoverImageResponse;
  content!: EditorJsOutputData;
  createdAt!: Date;
  updatedAt!: Date;
}
```

### Public content multilingual shape

- Public response cuối cùng vẫn trả `EditorJsOutputData`
- Nhưng với blogs, đây là **localized output document**, không phải raw admin storage shape
- Admin storage shape hiện tại dùng shared block tree + localized text inline

Ví dụ admin-side persisted shape:

```json
{
  "blocks": [
    {
      "type": "paragraph",
      "data": {
        "text": {
          "en": "A short spring story captured in Hanoi.",
          "vi": "Cau chuyen mua xuan ngan duoc ghi lai tai Ha Noi.",
          "cn": "Zai He Nei ji lu de chun tian xiao gu shi."
        }
      }
    },
    {
      "type": "mediaLayout",
      "data": {
        "items": [
          {
            "id": "item-image-1",
            "kind": "image",
            "fileId": "file-blog-content-1",
            "url": "https://cdn.example.com/blog-image.jpg"
          }
        ]
      }
    }
  ]
}
```

Ví dụ public response khi request locale `vi`:

```json
{
  "blocks": [
    {
      "type": "paragraph",
      "data": {
        "text": "Cau chuyen mua xuan ngan duoc ghi lai tai Ha Noi."
      }
    },
    {
      "type": "mediaLayout",
      "data": {
        "items": [
          {
            "id": "item-image-1",
            "kind": "image",
            "fileId": "file-blog-content-1",
            "url": "https://cdn.example.com/blog-image.jpg"
          }
        ]
      }
    }
  ]
}
```

### Related types

File gốc backend:

- `src/modules/blogs/application/dto/public-blog.output.ts`
- `src/modules/blogs/blogs.types.ts`

Bản copy:

- [public-blog.output.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/public-blog.output.ts)
- [blogs.types.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/blogs.types.ts)

### Giải thích `EditorJsOutputData`

`EditorJsOutputData` trong blogs detail có cùng shape runtime với projects, nhưng đang được định nghĩa trong file riêng của blogs.

File gốc backend:

- `src/modules/blogs/blogs.types.ts`

Bản copy:

- [blogs.types.ts](/Users/koding88/dev/project/snaphanoi-be/documents/public-apis/blogs/source-types/blogs.types.ts)

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

- `content` là whole Editor.js document
- không phải HTML string
- response public đã localize text rồi
- FE chỉ cần block renderer phù hợp

### Lưu ý tích hợp FE

- Blog detail public không có internal fields như `isPinned`, `isPublished`, `isActive`, `deletedAt`, `createdBy`.
- Public detail dùng locale + fallback giống public list.
